import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import CastDisplay from "@/components/CastDisplay";
import Spinner from "@/components/Spinner";
import Link from "next/link";

export default function Home() {
  const [randomCastData, setRandomCastData] = useState([]);
  const [userInformation, setUserInformation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollDivRef = useRef(null);

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
      if (scrollDivRef.current) {
        scrollDivRef.current.scrollTop = 0;
      }
    } catch (error) {
      setError("Failed to fetch random cast: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="md:w-96 jester mx-auto h-screen border-white border-l-2 border-r-2 overflow-y-scroll  bg-black text-white">
      <Head>
        <title>randomcaster</title>
        <link rel="icon" href="/favicon.ico" />

        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>randomcaster</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://randomcaster.lat/" />
        <meta property="og:title" content="randomcaster - embrace the chaos" />
        <meta
          property="og:description"
          content="dive into the unpredictable world of randomcaster... where every click is a window into a new person"
        />
        <meta property="og:image" content="/images/coyotee.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://randomcaster.lat/" />
        <meta
          property="twitter:title"
          content="Randomcaster - Embrace the Chaos"
        />
        <meta
          property="twitter:description"
          content="Dive into the unpredictable world of Randomcaster where every click is a new adventure!"
        />
        <meta
          property="twitter:image"
          content="https://randomcaster.lat/preview-image.png"
        />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      </Head>

      <main className="flex flex-col items-center justify-start w-full h-full px-1 text-center relative">
        <div ref={scrollDivRef} className="grow pb-3  w-full overflow-y-scroll">
          {randomCastData.map((cast, index) => (
            <CastDisplay
              key={index}
              cast={cast}
              user={userInformation[index]}
            />
          ))}
        </div>

        <div className="w-full h-24 py-2 opacity-60 shadow-lg shadow-black bg-black flex items-center justify-center ">
          <button
            onClick={fetchRandomCast}
            disabled={loading}
            className={`px-6 py-3 ${
              loading ? "bg-purple-600" : "bg-blue-500 hover:bg-blue-700"
            } text-white text-xl rounded-full transition duration-300  border-red-300 border-2 ease-in-out`}
          >
            {loading ? "searching..." : "random cast"}
          </button>

          <button
            className="ml-4 bg-red-600 w-fit py-1 px-2 rounded-full"
            onClick={() => {
              setRandomCastData([]);
              setUserInformation([]);
            }}
          >
            start again
          </button>
          <Link
            className="mx-4 text-yellow-600 h-8 w-8 border-2 border-yellow-600 rounded-full p-auto bg-red-600"
            href="/wtf"
          >
            ?
          </Link>
        </div>
      </main>
    </div>
  );
}
