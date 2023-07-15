import { ethers } from "hardhat";

async function main() {
  const MintNFTErc721Dev = await ethers.getContractFactory("MintNFTErc721");
  const gasLimit = 200000000; 
  const MintNFTErc721 = await MintNFTErc721Dev.deploy(
    // process.env.NFT_NAME as string,
    // process.env.NFT_SYMBOL as string,
    // process.env.PRICEOFNFT as string
    "nft",
    "nft",
    "1000000000000",
    { gasLimit }
  );

  await MintNFTErc721.waitForDeployment();

  const data = {
    MintNFTErc721: MintNFTErc721.target,
  };
  console.log(JSON.stringify(data));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
