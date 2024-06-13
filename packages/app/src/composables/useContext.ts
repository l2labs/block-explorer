import { computed, type ComputedRef, type Ref, ref, watch } from "vue";

import { useStorage } from "@vueuse/core";
import * as zkSyncSdk from "zksync-web3";

import useEnvironmentConfig from "./useEnvironmentConfig";

import type { NetworkConfig } from "@/configs";

import { getWindowLocation } from "@/utils/helpers";

const network = useStorage("selectedNetwork_v2", "");
const isReady = ref(false);

export type Context = {
  isReady: Ref<boolean>;
  currentNetwork: ComputedRef<NetworkConfig>;
  networks: ComputedRef<NetworkConfig[]>;
  getL2Provider: () => zkSyncSdk.Provider;
  identifyNetwork: () => void;
};

let l2Provider: zkSyncSdk.Provider | null;
export default (): Context => {
  const environmentConfig = useEnvironmentConfig();

  const networks = computed<NetworkConfig[]>(() => {
    return environmentConfig.value.networks;
  });

  const currentNetwork = computed(() => {
    const networkName = network.value || environmentConfig.value.defaultNetworkName;
    return networks.value.find((networkEntry) => networkEntry.name === networkName) || networks.value[0];
  });

  function identifyNetwork() {
    const networkOnDomain = networks.value.find((e) => e.hostnames.includes(getWindowLocation().origin));

    const networkFromQueryParam = new URLSearchParams(getWindowLocation().search).get("network");

    const networkFromStorage = sessionStorage.getItem("network");

    if (networkFromQueryParam) {
      network.value = networkFromQueryParam;
    } else if (networkFromStorage) {
      network.value = networkFromStorage;
    } else if (networkOnDomain) {
      network.value = networkOnDomain.name;
    } else {
      network.value = environmentConfig.value.defaultNetworkName;
    }

    isReady.value = true;
  }

  watch(currentNetwork, () => {
    // reset l2Provider on network change so it is recreated for the correct network in getL2Provider
    l2Provider = null;
  });

  function getL2Provider() {
    if (!l2Provider) {
      l2Provider = new zkSyncSdk.Provider(currentNetwork.value.rpcUrl);
    }
    return l2Provider;
  }

  return {
    isReady,
    currentNetwork,
    networks,
    identifyNetwork,
    getL2Provider,
  };
};
