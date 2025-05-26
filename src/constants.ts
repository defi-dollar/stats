import path from "path";

export const OUTPUT_DIR = "docs";
export const OUTPUT_DIR_V1 = path.join(OUTPUT_DIR, "v1");
export const OUTPUT_DIR_V2 = path.join(OUTPUT_DIR, "v2");

export const DUNE_SPV2_AVERAGE_APY_URL_MAINNET = "https://api.dune.com/api/v1/query/4716740/results";
export const DUNE_SPV2_AVERAGE_APY_URL_SEPOLIA = null;
// export const DUNE_SPV2_AVERAGE_APY_URL_BLAST = "https://api.dune.com/api/v1/query/4680052/results";
export const DUNE_SPV2_AVERAGE_APY_URL_BLAST = null;
export const DUNE_URLS = {
  mainnet: DUNE_SPV2_AVERAGE_APY_URL_MAINNET,
  sepolia: DUNE_SPV2_AVERAGE_APY_URL_SEPOLIA,
  blast: DUNE_SPV2_AVERAGE_APY_URL_BLAST
} as const;