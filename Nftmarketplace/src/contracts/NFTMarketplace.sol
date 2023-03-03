// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// NFT marketplace contract
contract NFTMarketplace is ERC721, ReentrancyGuard {
    using Counters for Counters.Counter;

    // Counter for token ID
    Counters.Counter private _TokenId;

    // Maximum supply of tokens
    uint256 maxSupply = 10000;
    // cost of minting a Token
    // uint256 mintingFee = 2 ether;

    // Token struct
    struct Token {
        address owner;
        uint256 id;
        string tokenURL;
        string title;
        uint256 price;
        string description;
        uint256 timestamp;
    }

    // Array to store all token transactions
    Token[] transactions;

    // Mapping to store each token by ID
    mapping(uint256 => Token) private tokens;

    // Array to keep track of all token IDs
    uint256[] private tokenIdNumber;

    // Address of the owner of the contract
    address payable owner;

    // Mapping to check if a token with a given URL has already been minted
    mapping(string => bool) private mintedUrls;

    // Event emitted when a new token is created
    event TokenCreated(
        address sender,
        uint256 tokenId,
        string title,
        uint256 timestamp,
        string tokenPicture,
        uint256 tokenPrice
    );

    // Constructor to initialize the contract
    constructor(
        string memory _name,
        string memory _symbol,
        address _owner
    ) ERC721(_name, _symbol) {
        // Set the owner
        owner = payable(_owner);
    }

    // Event emitted when a token is sold
    event TokenSold(address from, address to, uint256 tokenId);

    // Event emitted when the price of a token is changed
    event TokenPriceChanged(address sender, uint256 tokenId, uint256 newPrice);

    /**
     * @dev Creates a new NFT and mints it to the caller of the function.
     * @param tokenPicture The URL of the picture associated with the NFT.
     * @param tokenTitle The title of the NFT.
     * @param tokenDescription The description of the NFT.
     * @param tokenPrice The price of the NFT.
     */
    function mint(
        string memory tokenPicture,
        string memory tokenTitle,
        string memory tokenDescription,
        uint256 tokenPrice
    ) public payable {
        // Check if maximum token supply has been reached
        require(
            _TokenId.current() <= maxSupply,
            "Maximum token supply reached"
        );

        // Check if token with given picture already exists
        require(
            !mintedUrls[tokenPicture],
            "Token with this picture already exists."
        );

        // Increment token ID
        _TokenId.increment();

        // Get the current token ID
        uint256 tokenId = _TokenId.current();

        // Mint the new token to the sender
        _safeMint(msg.sender, tokenId);

        // Store token properties in tokens mapping
        Token storage tk = tokens[tokenId];
        tk.owner = msg.sender;
        tk.id = tokenId;
        tk.tokenURL = tokenPicture;
        tk.title = tokenTitle;
        tk.price = tokenPrice;
        tk.description = tokenDescription;
        tk.timestamp = block.timestamp;

        // Push the token ID to tokenIdNumber array
        tokenIdNumber.push(tokenId);

        // Emit the TokenCreated event with relevant information
        emit TokenCreated(
            msg.sender,
            tokenId,
            tokenTitle,
            block.timestamp,
            tokenPicture,
            tokenPrice
        );

        // Update mintedUrls mapping to prevent duplicate tokens with the same picture
        mintedUrls[tokenPicture] = true;
    }

    // Function to list all NFTs in the marketplace
    function listNFTs() public view returns (Token[] memory) {
        // Create an array to store the result
        Token[] memory result = new Token[](tokenIdNumber.length);

        // Loop through all token IDs and add the corresponding token to the result array
        for (uint256 i = 0; i < tokenIdNumber.length; i++) {
            result[i] = tokens[tokenIdNumber[i]];
        }

        // Return the result array
        return result;
    }

    // Function to retrieve the transaction history for all tokens
    function transactionHistory() public view returns (Token[] memory) {
        // Return the array of transactions
        return transactions;
    }

    // Function to change the price of a token
    function changePrice(uint256 tokenId, uint256 newPrice) public {
        // Require that the caller is the owner of the token
        require(
            tokens[tokenId].owner == msg.sender,
            "You are not the owner of this token."
        );
        // Require that the new price is greater than 0
        require(newPrice > 0, "Price must be greater than 0.");
        // Update the price of the token
        tokens[tokenId].price = newPrice;

        // Emit an event to indicate that the price of the token has been changed
        emit TokenPriceChanged(msg.sender, tokenId, newPrice);
    }

    // Function to buy a token
    function buy(uint256 tokenId) public payable {
        // Check that the caller is not the owner of the token
        require(
            tokens[tokenId].owner != msg.sender,
            "You cannot buy your own token."
        );
        // Check that the caller has sent enough ether to buy the token
        require(msg.value >= tokens[tokenId].price, "Insufficient funds.");

        // Send the ether to the token owner
        payEther(tokens[tokenId].owner, msg.value);

        // Add the transaction to the transaction history
        transactions.push(
            Token(
                msg.sender,
                tokenId,
                tokens[tokenId].tokenURL,
                tokens[tokenId].title,
                msg.value,
                tokens[tokenId].description,
                block.timestamp
            )
        );
        // Transfer the token to the buyer
        _transfer(tokens[tokenId].owner, msg.sender, tokenId);

        // Emit an event to indicate that the token has been sold
        emit TokenSold(tokens[tokenId].owner, msg.sender, tokenId);
        // Update the owner of the token to be the buyer
        tokens[tokenId].owner = msg.sender;
    }

    // Function to send ether to an address
    function payEther(address to, uint256 amount) internal nonReentrant {
        // Send the ether to the specified address
        (bool success, ) = payable(to).call{value: amount}("");
        // Check that the transfer was successful
        require(success);
    }
}
