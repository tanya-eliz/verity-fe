import { ethers } from "hardhat";
import fs from "fs";

async function main() {

  const vtkToken = await ethers.deployContract("VerityToken", []);
  await vtkToken.waitForDeployment();

  console.log(`VerityToken deployed to ${vtkToken.target}`);
  // Write deployed address to json file
  const projectRootPath = process.cwd();
  const deployedContractAddresses = require("../deployed/contractAddress.json");
  if (!deployedContractAddresses.VerityToken) {
    deployedContractAddresses.VerityToken = vtkToken.target;
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
