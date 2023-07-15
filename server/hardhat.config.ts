import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// import "@openzeppelin/hardhat-upgrades";

import { ethers } from 'hardhat';
// const PRIVATE_KEY = ["d111e251634b0af6316f863bba605efe8c11ac211a67d5783aabc66c850f04c5"]
const PRIVATE_KEY = ["bd4839c57eae2f1cafc9ac31d82291ef9be1f47b9626e55efb0ee72be13d3378"]

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    testnet: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
      accounts: [
        "d8a8ce8051cb5a44102f8634524f75889b7b49fe6eeee4b358cc924598d3d196",
      ],
      timeout: 200000,
    },
    mumbai_testnet: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/HuKkvcB5-4uhTobrQ6YIQL_jh3i8hL5F",
      chainId: 80001,
      accounts: PRIVATE_KEY,
      timeout: 200000,
    },
    xdc_testnet: { 
      url: "https://rpc.apothem.network",
      chainId: 51,
      accounts: ["bd4839c57eae2f1cafc9ac31d82291ef9be1f47b9626e55efb0ee72be13d3378"],
      timeout: 1400000,
      gas: 500000000, //units of gas you are willing to pay, aka gas limit
      gasPrice:  500000000000, //gas is typically in units of gwei, but you must enter it as wei here
    },
    polygon_mainnet: {
      url: "https://polygon.llamarpc.com	",
      chainId: 137,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;
