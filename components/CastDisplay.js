import React, { useState } from "react";
import Image from "next/image";

const CastDisplay = ({ cast, user }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  // Format the timestamp
  console.log("the cast is : ", cast);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  return (
    <a
      className="text-purple-400 active:text-purple-600"
      rel="noopener noreferrer"
      href={`https://www.warpcast.com/${user.username}/${cast.hash.slice(
        0,
        10
      )}`}
      target="_blank"
    >
      <div
        className={` ${
          imageLoaded ? "fade-in" : ""
        } my-4 max-w-2xl  overflow-y-scroll  w-full bg-white text-black shadow-md rounded-lg `}
      >
        <div className={` p-4 w-full flex items-start space-x-4 h-full`}>
          <div className="w-2/5 aspect-square rounded-full overflow-hidden relative">
            <Image src={user.pfp.url} alt="Profile" layout="fill" />
          </div>
          <div className="w-3/5 flex flex-col items-start">
            <div className="text-lg  font-medium text-purple-600">
              {user.displayName}
            </div>
            <div className="text-sm text-gray-500">@{user.username}</div>
            <div className="text-sm text-gray-500">
              {formatTimestamp(cast.timestamp)}
            </div>
            <p className="text-gray-700 text-left">{cast.text}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CastDisplay;
