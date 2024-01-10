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
      setRandomCastData([data.randomCast, ...randomCastData]);
      setUserInformation([data.userInformation, ...userInformation]);
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
    <div className="md:w-96 mx-auto mb-24 h-screen border-white border-l-2 border-r-2 overflow-y-scroll flex flex-col items-center justify-center  pt-2 pb-12 bg-black text-white">
      <Head>
        <title>randomcaster</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex jester flex-col items-center justify-start  w-full h-screen flex-1 px-1 text-center relative">
        <div className="h-4/5 w-full">
          {randomCastData.map((cast, index) => (
            <div
              key={index}
              className={`${
                index == randomCastData.length && "mb-12"
              } my-4 max-w-2xl  overflow-y-scroll  w-full bg-white text-black shadow-md rounded-lg `}
            >
              <div className="p-4 w-full flex items-start space-x-4 h-full">
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
          <div className="flex justify-center">
            <button
              onClick={fetchRandomCast}
              disabled={loading}
              className={`px-6 py-3 ${
                loading ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-700"
              } text-white text-xl rounded-full transition duration-300  border-red-300 border-2 ease-in-out`}
            >
              {loading ? "exploring farcaster..." : "get random cast"}
            </button>
            <button
              className="ml-4 bg-red-600 h-4 w-4 rounded-full"
              onClick={() => {
                setRandomCastData([]);
                setUserInformation([]);
              }}
            ></button>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </main>
    </div>
  );
}
