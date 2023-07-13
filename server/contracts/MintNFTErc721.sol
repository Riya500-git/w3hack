// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/eip/ERC721A.sol";

contract MintNFTErc721 is ERC721A
   
{
    // IERC20 public token;
    uint public PRICE_OF_ONE_NFT_IN_Token;
    string baseURI;
    address owner; 

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }   

    mapping(address => mapping(uint => uint)) public _ownedTokens;

    constructor(string memory name,
        string memory symbol,
        uint256 _PRICE_OF_ONE_NFT_IN_Token) ERC721A(name, symbol) {
        PRICE_OF_ONE_NFT_IN_Token = _PRICE_OF_ONE_NFT_IN_Token;
        owner = msg.sender;
    }

    /**
     * Batch Buy
     *
     * @param batchSize -  No of NFTS to buy
     * @param priceOFBatchNFTSToBuy - Price of all the Batch NFTs
     */
    function purchaseBCO2FORTOKEN(uint256 batchSize, uint256 priceOFBatchNFTSToBuy) payable public {
        require(batchSize > 0, 'Batch Size Should be greater than 0');
        require(
            priceOFBatchNFTSToBuy >= PRICE_OF_ONE_NFT_IN_Token * batchSize,
            'Price of NFTs is less than the batch size'
        );
        require(msg.value == priceOFBatchNFTSToBuy, 'Insuffcient Amount!');
        for (uint256 i = 0; i < batchSize; ) {
            issueToken(msg.sender);
            unchecked {
                i++;
            }
        }
    }

    function setPRICEOFONEBCO2NFTINTOKEN(uint256 _PRICE_OF_ONE_NFT_IN_Token) external onlyOwner {
        PRICE_OF_ONE_NFT_IN_Token = _PRICE_OF_ONE_NFT_IN_Token;
    }

    /**
     * Set BaseURI
     *
     * @param _BASEURIOFCOLLECTION - BaseURI
     */
    function setBaseURI(string memory _BASEURIOFCOLLECTION) external onlyOwner {
        baseURI = _BASEURIOFCOLLECTION;
    }

    /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override(ERC721A) returns (string memory) {
        tokenURI(tokenId);
    }

    function tokenOfOwnerByIndex(address _owner, uint256 index) public view returns (uint256) {
    require(index < balanceOf(_owner), "Owner index out of bounds");

    return _ownedTokens[_owner][index];
}

    /**
     * Get Holder Token IDs
     *
     * @param holder - Holder of the Tokens
     */
    function getHolderTokenIds(address holder) public view returns (uint256[] memory) {
        uint256 count = balanceOf(holder);
        uint256[] memory result = new uint256[](count);
        for (uint256 index = 0; index < count; index++) {
            result[index] = tokenOfOwnerByIndex(holder, index);
        }
        return result;
    }

  
    /**
     * Mint NFT
     *
     * @param recipient - NFT will be issued to recipient
     */
    function issueToken(address recipient) internal {
       _safeMint(recipient,1);
       
    }

    
    function _baseURI() internal view virtual override(ERC721A) returns (string memory) {
        return baseURI;
    }

    function _burn(uint256 tokenId) internal override(ERC721A) {
        super._burn(tokenId);
    }

}