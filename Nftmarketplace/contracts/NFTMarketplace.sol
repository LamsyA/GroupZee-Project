// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./ERC721.sol";
import "./ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMarketplace is ERC721Enumerable, Ownable {
    using Strings for uint256;
    mapping(string => uint8) existingURIs;
    mapping(uint256 => address) public tokenHolders;

    address public artist;
    uint256 public royaltyFee;
    uint256 public supply = 0;
    uint256 public totalTransactions = 0;
    uint256 public mintingCost = 0.01 ether;

    event Sale(
        uint256 id,
        address indexed owner,
        uint256 cost,
        string metadataURI,
        uint256 timestamp
    );

    struct Transaction {
        uint256 id;
        address owner;
        uint256 cost;
        string title;
        string description;
        string metadataURI;
        uint256 timestamp;
    }

    Transaction[] pastTransactions;
    Transaction[] currentSupply;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _royaltyFee,
        address _artist
    ) ERC721(_name, _symbol) {
        royaltyFee = _royaltyFee;
        artist = _artist;
    }

    function mintNewToken(
        string memory title,
        string memory description,
        string memory metadataURI,
        uint256 salesPrice
    ) external payable {
        require(msg.value >= mintingCost, "Ether too low for minting!");
        require(existingURIs[metadataURI] == 0, "This NFT is already minted!");
        require(msg.sender != owner(), "Sales not allowed!");

        uint256 royalty = (msg.value * royaltyFee) / 100;
        payEther(artist, royalty);
        payEther(owner(), (msg.value - royalty));

        supply++;

        currentSupply.push(
            Transaction(
                supply,
                msg.sender,
                salesPrice,
                title,
                description,
                metadataURI,
                block.timestamp
            )
        );

        emit Sale(supply, msg.sender, msg.value, metadataURI, block.timestamp);

        _safeMint(msg.sender, supply);
        existingURIs[metadataURI] = 1;
        tokenHolders[supply] = msg.sender;
    }

    function purchaseToken(uint256 id) external payable {
        require(
            msg.value >= currentSupply[id - 1].cost,
            "Ether too low for purchase!"
        );
        require(
            msg.sender != currentSupply[id - 1].owner,
            "Operation Not Allowed!"
        );

        uint256 royalty = (msg.value * royaltyFee) / 100;
        payEther(artist, royalty);
        payEther(currentSupply[id - 1].owner, (msg.value - royalty));
        totalTransactions++;

        pastTransactions.push(
            Transaction(
                totalTransactions,
                msg.sender,
                msg.value,
                currentSupply[id - 1].title,
                currentSupply[id - 1].description,
                currentSupply[id - 1].metadataURI,
                block.timestamp
            )
        );

        emit Sale(
            totalTransactions,
            msg.sender,
            msg.value,
            currentSupply[id - 1].metadataURI,
            block.timestamp
        );

        currentSupply[id - 1].owner = msg.sender;
    }

    function updatePrice(uint256 id, uint256 newPrice) external returns (bool) {
        require(newPrice > 0 ether, "Ether too low!");
        require(
            msg.sender == currentSupply[id - 1].owner,
            "Operation Not Allowed!"
        );

        currentSupply[id - 1].cost = newPrice;
        return true;
    }

    function payEther(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function getAllTokenInfo() public view returns (Transaction[] memory) {
        return currentSupply;
    }

    function getTokenInfo(uint256 id) public view returns (Transaction memory) {
        return currentSupply[id - 1];
    }

    function getPastTransactions() public view returns (Transaction[] memory) {
        return pastTransactions;
    }
}
