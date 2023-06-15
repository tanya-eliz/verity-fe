import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const [owner] = await ethers.getSigners();
  // read from deployed contractAddress.json
  const deployedContractAddresses = require("../deployed/contractAddress.json");

  const faucet = await ethers.deployContract("Faucet", [deployedContractAddresses.VerityToken, owner.address , 60, 10]);
  await faucet.waitForDeployment();
  console.log(`FaucetContract deployed to ${faucet.target}`);
  
  const projectRootPath = process.cwd();
  if (!deployedContractAddresses.Faucet) {
    deployedContractAddresses.Faucet = faucet.target;
  }
  fs.writeFileSync(
    `${projectRootPath}/deployed/contractAddress.json`,
    JSON.stringify(deployedContractAddresses)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
