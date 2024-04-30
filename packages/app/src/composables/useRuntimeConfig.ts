import type { RuntimeConfig } from "@/configs";

export default (): RuntimeConfig => {
  return {
    appEnvironment: import.meta.env?.APP_MODE || "local",
  };
};
