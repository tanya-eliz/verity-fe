# Hardhat Project for Smart Contract Testing and Deployment

## Description
> This project contains an ERC20Token and a FaucetSmartContract.
> We will be deploying these on the PolygonMumbai Testnet.

### Setting Up Development Environment:
1) Install nvm and npm on your machine
2) Run npm install

### Installation:
1) Create PolygonScan account and obtain the API Key
2) Create a Smart Contract Wallet in the PolygonMumbai Testnet (e.g using Metamask) and retrieve the private key of the wallet.
3) Dulicate the .env.example file and rename it as .env
4) Update the secret keys accordingly in the .env file

### Commands:
1) Testing Smart contract: ```npx hardhat test```
2) Test with gas: ```REPORT_GAS=true npx hardhat test```
3) Deploying Smart Contract: ```npx hardhat run scripts/deploy.ts```
4) Running Hardhat Node: ```npx hardhat node```
5) For more information: ```npx hardhat help```