module.exports = {
  apps: [
    {
      name: process.env.NAME + "-api",
      exec_mode: "cluster",
      instances: 1,
      script: "./packages/api/dist/main.js",
    },
  ],
};
