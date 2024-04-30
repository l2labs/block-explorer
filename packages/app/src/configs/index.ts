export type NetworkConfig = {
  name: string;
  icon: string;
  verificationApiUrl?: string;
  apiUrl: string;
  rpcUrl: string;
  bridgeUrl?: string;
  l2NetworkName: string;
  l2ChainId: number;
  l1ExplorerUrl?: string;
  maintenance: boolean;
  published: boolean;
  hostnames: string[];
  tokensMinLiquidity?: number;
};

export type EnvironmentConfig = {
  networks: NetworkConfig[];
  defaultNetworkName: string;
};

export type RuntimeConfig = {
  appEnvironment: string;
};
