module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "i.seadn.io",
        port: "",
      },
    ],
  },

  env: {
    NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
  },
};
