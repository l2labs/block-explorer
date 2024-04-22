module.exports = {
  apps: [
    {
      name: process.env.NAME,
      exec_mode: "cluster",
      instances: 1,
      script: "./server/index.mjs",
    },
  ],
};
