import type { RuntimeConfig } from "@/configs";

export default (): RuntimeConfig => {
  return {
    appEnvironment: APP_MODE || "local",
  };
};
