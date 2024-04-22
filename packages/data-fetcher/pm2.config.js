module.exports = {
  apps: [
    {
      name: process.env.NAME + "-data-fetcher",
      exec_mode: "cluster",
      instances: 1,
      script: "./dist/main.js",
    },
  ],
};
