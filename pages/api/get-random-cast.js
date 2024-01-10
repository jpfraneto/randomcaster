import axios from "axios";

export default async function handler(req, res) {
  try {
    const totalFarcasterAccounts = 200000;
    const viewerFid = 18350;
    const limitOfCasts = 88; // maximum is 150, default is 25
    const cursor = "";
    let casts = [];
    let times = 0;
    while (casts.length == 0) {
      const randomFid = Math.floor(totalFarcasterAccounts * Math.random());
      console.log("the random fid is: ", randomFid);
      const response = await axios.get(
        `https://api.neynar.com/v1/farcaster/casts?fid=${randomFid}&viewerFid=${viewerFid}&limit=${limitOfCasts}`,
        {
          headers: {
            api_key: process.env.NEYNAR_API_KEY,
          },
        }
      );
      console.log("the axios response is: ", response.data.result);
      casts = response.data.result.casts;
      times++;
    }
    console.log(`After ${times} attempts, this is the random cast:`);
    const randomCast = casts[Math.floor(casts.length * Math.random())];
    console.log(randomCast);
    const userInformation = await getFullFarcasterUser(
      randomCast.author.fid,
      viewerFid
    );
    console.log("the user information is: ", userInformation);

    res.status(200).json({ success: true, randomCast, userInformation });
  } catch (error) {
    console.log("there was an error on the home route", error);
    res.status(500).json({
      success: false,
      message: "there was an error on the home route",
    });
  }
}

async function getFullFarcasterUser(fid, viewerFid) {
  try {
    const response = await axios.get(
      `https://api.neynar.com/v1/farcaster/user?fid=${fid}&viewerFid=${viewerFid}`,
      {
        headers: {
          api_key: process.env.NEYNAR_API_KEY,
        },
      }
    );
    console.log("the response here is: ", response);
    return response.data.result.user;
  } catch (error) {
    console.log("there was an error getting the full farcaster user");
  }
}
