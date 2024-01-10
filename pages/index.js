import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [randomCastData, setRandomCastData] = useState([]);
  const [userInformation, setUserInformation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomCast = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/get-random-cast");
      if (!response.ok) throw new Error("Network response was not ok.");
      const data = await response.json();
      console.log("the data is: ", data);
      setRandomCastData([...randomCastData, data.randomCast]);
      setUserInformation([...userInformation, data.userInformation]);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch random cast: " + error.message);
      setLoading(false);
    }
  };

  // Format the timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="md:w-96 mx-auto h-screen border-white border-l-2 border-r-2 overflow-y-scroll flex flex-col items-center justify-center  pt-2 pb-12 bg-black text-white">
      <Head>
        <title>randomcaster</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          backgroundImage: "/images/jester.png",
          backgroundColor: "black",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col items-center justify-end pb-12 w-full h-screen flex-1 px-1 text-center relative"
      >
        <div className="h-full">
          {randomCastData.map((cast, index) => (
            <div
              key={index}
              className={`${
                index == randomCastData.length && "mb-12"
              } my-4 max-w-2xl  overflow-y-scroll  w-full bg-white text-black shadow-md rounded-lg overflow-hidden`}
            >
              <div className="p-4 w-full flex items-start space-x-4">
                <div className="w-2/5 aspect-square rounded-full overflow-hidden relative">
                  <Image
                    src={userInformation[index].pfp.url}
                    alt="Profile"
                    layout="fill"
                  />
                </div>
                <div className="w-3/5 flex flex-col items-start">
                  <div className="text-lg  font-medium text-purple-600">
                    {userInformation[index].displayName}
                  </div>
                  <div className="text-sm text-gray-500">
                    @{userInformation[index].username}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatTimestamp(cast.timestamp)}
                  </div>
                  <p className="text-gray-700 text-left">{cast.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full fixed bottom-2 z-10 ">
          <button
            onClick={fetchRandomCast}
            disabled={loading}
            className={`px-6 py-3 ${
              loading ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-700"
            } text-white text-xl rounded-full transition duration-300  border-red-300 border-2 ease-in-out`}
          >
            {loading ? "exploring farcaster..." : "get random cast"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </main>
    </div>
  );
}
