import { computed, ref } from "vue";

import type { EnvironmentConfig, RuntimeConfig } from "@/configs";

const config = ref<EnvironmentConfig>({
  networks: [],
  defaultNetworkName: "",
});

export async function loadEnvironmentConfig(runtimeConfig: RuntimeConfig): Promise<void> {
  const envConfig: EnvironmentConfig = (await import(`../configs/${runtimeConfig.appEnvironment}.config.json`)).default;
  config.value = envConfig;
}

export default () => {
  return computed(() => config.value);
};
