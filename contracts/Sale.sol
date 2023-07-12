// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Erc721Sale {
    using AddressUpgradeable for address;
    using Counters for Counters.Counter;

    IERC721 public bco2;
    IERC20 public token;
    Counters.Counter public _saleIds;

    struct Sale {
        address nftContractAddress;
        uint256 saleId;
        uint256[] nftIds;
        uint256 price;
        address owner;
        bool isCancelled;
    }
    address owner; 

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }


    // saleId => Sale mapping
    mapping(uint256 => Sale) public _nftSales;
    mapping(address => bool) public registeredContracts;

    event SaleAdded(address nftContractAddress, uint256 indexed _saleId, uint256 _price, address indexed _owner);
    event SaleCancelled(uint256 indexed _saleId, uint256 _price, address indexed _owner);
    event Sold(uint256 _saleId, address indexed _seller, address indexed _buyer, uint256 _price);
    event NFTContractWhitelistStatus(address[] indexed contractAddresses, bool isWhitelisted);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        owner = msg.sender;

    }

    function singleWhitelistNFTs(address contractAdd, bool isWhitelisted) external onlyOwner {
            registeredContracts[contractAdd] = isWhitelisted;
    }


    /**
     * Put up multiple NFTs for Sale
     *
     * @param nftContractAddress - NFT Contract Address
     * @param nftIds - array of nftIds of the NFTs
     * @param price - prices to sell NFTs for
     */
    function putNFTsForSale(
        address nftContractAddress,
        uint256[] calldata nftIds,
        uint256 price
    ) external {
        require(registeredContracts[nftContractAddress], 'Not a Registered NFT Contract');
        require(nftIds.length > 0, 'Invalid NFTIds length');
        require(
            IERC721(nftContractAddress).isApprovedForAll(msg.sender, address(this)),
            'NFT Not Approved For Transfer'
        );
        _saleIds.increment();
        uint256 saleId = _saleIds.current();
        require(!_nftSales[saleId].isCancelled, 'NFT Sale is active');
        Sale memory sale = Sale(nftContractAddress, saleId, nftIds, price, msg.sender, false);
        _nftSales[saleId] = sale;
        emit SaleAdded(nftContractAddress, saleId, price, msg.sender);
    }

    /**
     * Cancel NFT Sale
     *
     * @param saleId -  Sale id of the NFT
     */
    function cancelSale(uint256 saleId) external {
        require(_nftSales[saleId].owner == msg.sender, 'Can only be cancelled by the owner of the Sale');
        require(!_nftSales[saleId].isCancelled, 'NFT is not up for sale');
        _nftSales[saleId].isCancelled = true;
        emit SaleCancelled(saleId, _nftSales[saleId].price, _nftSales[saleId].owner);
    }

    /**
     * Purchase NFT
     *
     * @param saleId - saleId of the NFT
     * @param amount - amount of ERC20 tokens to use for purchase
     */
    function purchaseNFTs(uint256 saleId, uint256 amount) payable external {
        Sale memory sale = _nftSales[saleId];
        require(!sale.isCancelled, 'NFT Sale Cancelled');
        require(sale.price == amount, 'Token amount is incorrect');
        require(msg.value == amount, 'Insuffcient Amount!');
        address payable seller = payable(sale.owner);
        address buyer =  msg.sender;

        // transfer token tokens from buyer to seller
        // token.transferFrom(buyer, seller, amount);
        seller.transfer(msg.value);
        for (uint256 i = 0; i < sale.nftIds.length; ) {
            // transfer bco2 to buyer
            IERC721(sale.nftContractAddress).safeTransferFrom(seller, buyer, sale.nftIds[i]);
            unchecked {
                i++;
            }
        }

        sale.owner = buyer;
        _nftSales[saleId] = sale;

        emit Sold(saleId, seller, buyer, sale.price);
    }
}