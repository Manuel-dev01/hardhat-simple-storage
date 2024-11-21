require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config() // yarn add --dev dotenv
require("@nomiclabs/hardhat-etherscan") // yarn add --dev @nomiclabs/hardhat-etherscan
require("./tasks/block-number")
require("hardhat-gas-reporter") // yarn add hardhat-gas-reporter --dev
require("solidity-coverage") // yarn add --dev solidity-coverage


const PRIVATE_KEY = process.env.PRIVATE_KEY || "key"
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const COINMARKET = process.env.COINMARKET_API_KAY || "key "

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.7",

  networks: {
    sepolia: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
    },

    localhost: {
      url: "Url output from running: yarn hardhat node",
      chainId: 31337
    }
  },

  etherscan: {
    apikey: ETHERSCAN_API_KEY
  },

  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKET,
    token: "USD"
  }
};

