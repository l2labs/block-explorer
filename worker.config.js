module.exports = {
  apps: [
    {
      name: process.env.NAME + "-worker",
      exec_mode: "cluster",
      instances: 1,
      script: "./packages/worker/dist/main.js",
    },
  ],
};
