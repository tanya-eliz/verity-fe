import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import config before anything else
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const privateKey: string = process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY : "";
const polygonScanKey = process.env.POLYGONSCAN_API_KEY ? process.env.POLYGONSCAN_API_KEY : "";

if (privateKey === "") {
  console.error("Please set your PRIVATE_KEY in a .env file");
  process.exit(1);
}

const config: HardhatUserConfig = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey]
    }
  },
  etherscan: {
    apiKey: polygonScanKey
  },

  solidity: {
    compilers: [
      {
        version: "0.8.8",
      }
    ],
  },
};

export default config;
