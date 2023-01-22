// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTMarketplace {
    using Counters for Counters.Counter;

    Counters.Counter public _TokenId;
    // Counters.Counter public _candidateId;

    struct Token {
        address owner;
        uint256 id;
        string tokenURL;
        string title;
        uint256 price;
        string description;
        uint256 timestamp;
    }
    Token[] transactions;
    mapping(uint256 => Token) public tokens;
    uint256[] private tokenIdNumber;

    mapping(string => bool) public mintedUrls;

    event TokenCreated(
        address sender,
        uint256 tokenId,
        string title,
        uint256 timestamp,
        string tokenPicture,
        uint256 tokenPrice
    );

    event TokenSold(address from, address to, uint256 tokenId);

    event TokenPriceChanged(address sender, uint256 tokenId, uint256 newPrice);

    function mint(
        string memory tokenPicture,
        string memory tokenTitle,
        string memory tokenDescription,
        uint256 tokenPrice
    ) public payable {
        require(
            !mintedUrls[tokenPicture],
            "Token with this picture already exists."
        );
        _TokenId.increment();

        uint256 tokenId = _TokenId.current();

        Token storage tk = tokens[tokenId];

        tk.owner = msg.sender;
        tk.id = tokenId;
        tk.tokenURL = tokenPicture;
        tk.title = tokenTitle;
        tk.price = tokenPrice;
        tk.description = tokenDescription;
        tk.timestamp = block.timestamp;

        tokenIdNumber.push(tokenId);

        emit TokenCreated(
            msg.sender,
            tokenId,
            tokenTitle,
            block.timestamp,
            tokenPicture,
            tokenPrice
        );
        mintedUrls[tokenPicture] = true;
    }

    function listNFTs() public view returns (Token[] memory) {
        Token[] memory result = new Token[](tokenIdNumber.length);
        for (uint256 i = 0; i < tokenIdNumber.length; i++) {
            result[i] = tokens[tokenIdNumber[i]];
        }
        return result;
    }

    function transactionHistory() public view returns (Token[] memory) {
        return transactions;
    }

    function changePrice(uint256 tokenId, uint256 newPrice) public {
        require(
            tokens[tokenId].owner == msg.sender,
            "You are not the owner of this token."
        );
        require(newPrice > 0, "Price must be greater than 0.");
        tokens[tokenId].price = newPrice;

        emit TokenPriceChanged(msg.sender, tokenId, newPrice);
    }

    function buy(uint256 tokenId) public payable {
        require(
            tokens[tokenId].owner != msg.sender,
            "You cannot buy your own token."
        );
        require(msg.value >= tokens[tokenId].price, "Insufficient funds.");

        payEther(tokens[tokenId].owner, msg.value);

        tokens[tokenId].owner = msg.sender;
        emit TokenSold(tokens[tokenId].owner, msg.sender, tokenId);
        transactions.push(
            Token(
                msg.sender,
                msg.value,
                tokens[tokenId].tokenURL,
                tokens[tokenId].title,
                tokenId,
                tokens[tokenId].description,
                block.timestamp
            )
        );
    }

    // function getTokenDetails()
    //     public
    //     view
    //     returns (Token[] memory)
    // {
    //     return tokens;
    // }

    function payEther(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }
}
