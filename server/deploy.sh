if [ "$4" = "testnet" ]; then
    NFT_NAME=$1 NFT_SYMBOL=$2 PRICEOFNFT=$3 npx hardhat run --network testnet scripts/deployMintNFTERC721.ts
elif [ "$4" = "mumbai_testnet" ]; then
    NFT_NAME=$1 NFT_SYMBOL=$2 PRICEOFNFT=$3 npx hardhat run --network mumbai_testnet scripts/deployMintNFTERC721.ts
elif [ "$4" = "xdc_testnet" ]; then
    NFT_NAME=$1 NFT_SYMBOL=$2 PRICEOFNFT=$3 npx hardhat run --network xdc_testnet scripts/deployMintNFTERC721.ts
else
    example='{"Error":"Wrong Command"}'
    echo $example
fi
