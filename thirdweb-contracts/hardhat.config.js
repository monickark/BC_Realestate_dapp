require("@matterlabs/hardhat-zksync-solc");
require("@nomiclabs/hardhat-waffle");

const PRIVATE_KEY = "e16582b7a2bab7c2cba20da6dad4d177a7d872a2049757dbce780cc3a26d8e6e";
const RPC_URL = "https://rpc.ankr.com/polgon_mumbai";

module.exports = {
  defaultNetwork: "polygon_mumbai",
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    hardhat : {
      chainId: 80001,
    },
    polygon_mumbai: {
      url : RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
