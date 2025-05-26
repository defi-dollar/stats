import fs from "fs";
import path from "path";
import util from "util";

import v2MainnetDeployment from "../deployments/defi-dollar.json";
import { getProvider } from "./connection";
import { fetchV2Stats } from "./v2/fetchV2Stats";

import {
  DUNE_SPV2_AVERAGE_APY_URL_MAINNET,
  OUTPUT_DIR_V2
} from "./constants";
import { EthersLiquity } from "@liquity/lib-ethers";

const panic = <T>(message: string): T => {
  throw new Error(message);
};

// const alchemyApiKey = process.env.ALCHEMY_API_KEY || panic("ALCHEMY_API_KEY is not set");
// const duneApiKey: string = process.env.DUNE_API_KEY || panic("DUNE_API_KEY is not set");
const alchemyApiKey = process.env.ALCHEMY_API_KEY || "_s2uS8W8QH6NAl8OjNWM023AGyi24hxs";
const duneApiKey: string = process.env.DUNE_API_KEY || "i6tPmqzEHf1YN9AYQBStOHbli3VIUhoF";
const mainnetProvider = getProvider("mainnet", { alchemyApiKey });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore-next-line
type Tree = Record<string, string | Tree>

const writeTree = (parentDir: string, tree: Tree) => {
  if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir);

  for (const [k, v] of Object.entries(tree)) {
    const prefix = path.join(parentDir, k);

    if (typeof v === "string") {
      fs.writeFileSync(`${prefix}.txt`, v);
    } else {
      writeTree(prefix, v);
    }
  }
};


EthersLiquity.connect(mainnetProvider)
  .then(async liquity => {
    const [
      v2RelaunchStats,
    ] = await Promise.all([
      fetchV2Stats({
        deployment: v2MainnetDeployment,
        provider: mainnetProvider,
        duneUrl: DUNE_SPV2_AVERAGE_APY_URL_MAINNET,
        duneApiKey
      }),
    ]);

    const v2Stats = {
      ...v2RelaunchStats,
    };

    writeTree(OUTPUT_DIR_V2, v2Stats);
    fs.writeFileSync(
      path.join(OUTPUT_DIR_V2, "ethereum.json"),
      JSON.stringify(v2RelaunchStats, null, 2)
    );

    console.log("v2 stats:", util.inspect(v2Stats, { colors: true, depth: null }));
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });