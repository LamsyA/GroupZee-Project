
# NFT Marketplace

This is a Solidity smart contract for an NFT (Non-Fungible Token) marketplace. The contract allows users to mint, buy, and sell NFTs on the Ethereum blockchain. It is built using the ERC721 standard for NFTs and includes additional functionalities for managing token ownership, pricing, and transaction history.

## Prerequisites

Before using this contract, ensure that you have the following:

- Solidity version ^0.8.0
- OpenZeppelin Contracts library version 4.3.1
- OpenZeppelin ReentrancyGuard library version 4.3.1


Link to live Demo: [**>>NFTMarketplace**](https://group-zee-project.vercel.app/)
: ![EasyProject](./Nftmarketplace/src/assets/1.JPG)

   <center><figcaption>NFT page </figcaption></center>

## Technology

This Project uses:

- Metamask
- Vite
- Goerli Faucet
- Infuria
- Truffle
- Solidity
- ReactJs
- Tailwind CSS
- Ganache-CLI
- Web3js

## Running the project

To run the program follow these steps:

1. Clone the project with the code below.

   ```sh

   # Make sure you have the above prerequisites installed already!
   git clone https://github.com/LamsyA/GroupZee-Project
    # Navigate to the new folder.
   npm install # Installs all the dependencies.
   ```

2. Create an Infuria project, copy and paste your key in the spaces below.
3. Update the `.env` file with the following details.
   ```sh
   ENDPOINT_URL=<PROVIDER_URL>
   SECRET_KEY=<SECRET_PHRASE>
   DEPLOYER_KEY=<YOUR_PRIVATE_KEY>
   ```
4. Run the app using `npm run dev`
   <br/>

## Useful links

- 👀 [Web3Js](https://docs.ethers.io/v5/)
- 🎅 [Faucet](https://faucets.chain.link/goerli)
- 🤖 [Ganache](https://trufflesuite.com/ganache/index.html)
- 🤖 [Vite](https://vitejs.dev/guide/)
- ✨ [Live Demo](https://group-zee-project.vercel.app/)
- ⚽ [Metamask](https://metamask.io/)
- 🚀 [Remix Editor](https://remix.ethereum.org/)
- 💡 [Truffle](https://trufflesuite.com/)
- 📈 [Infuria](https://infura.io/)
- 🔥 [ReactJs](https://reactjs.org/)
- 🐻 [Solidity](https://soliditylang.org/)

## Rules of engagement

- Only the minter of an NFT or Artwork can change the price of the art work they minted.
- Others can only purchase the Artwork and take ownership of the Artwork they bought.




## Contract Details

### Contract Dependencies

This contract imports the following dependencies from the OpenZeppelin Contracts library:

- `Counters` from `@openzeppelin/contracts/utils/Counters.sol`: A library for managing numerical counters.
- `ERC721` from `@openzeppelin/contracts/token/ERC721/ERC721.sol`: A contract implementation of the ERC721 standard for NFTs.
- `ReentrancyGuard` from `@openzeppelin/contracts/security/ReentrancyGuard.sol`: A contract to prevent reentrancy attacks.

### Contract Structure

The `NFTMarketplace` contract inherits from the `ERC721` contract and uses the `ReentrancyGuard` contract for security.

The main components of the contract are as follows:

#### Data Structures

- `Token`: A struct representing an NFT token, containing its owner, ID, token URL, title, price, description, and timestamp.
- `transactions`: An array to store all token transactions.
- `tokens`: A mapping to store each token by its ID.
- `tokenIdNumber`: An array to keep track of all token IDs.

#### State Variables

- `maxSupply`: The maximum supply of tokens that can be minted.
- `owner`: The address of the contract owner.

#### Events

- `TokenCreated`: Event emitted when a new token is created. It includes the sender, token ID, title, timestamp, token URL, and token price.
- `TokenSold`: Event emitted when a token is sold. It includes the previous owner, new owner, and token ID.
- `TokenPriceChanged`: Event emitted when the price of a token is changed. It includes the sender, token ID, and new price.

#### Constructor

The constructor accepts the name, symbol, and owner address as parameters and initializes the contract by setting the owner.

#### Modifiers

- `nonReentrant`: A modifier provided by `ReentrancyGuard` to prevent reentrant function calls.

#### External and Public Functions

The contract provides the following external and public functions:

- `mint`: Creates a new NFT and mints it to the caller of the function.
- `listNFTs`: Lists all NFTs in the marketplace.
- `transactionHistory`: Retrieves the transaction history for all tokens.
- `changePrice`: Changes the price of a token.
- `buy`: Allows a user to buy a token.

## Usage

1. Deploy the `NFTMarketplace` contract to the Ethereum network.
2. Set the maximum supply of tokens and the owner address.
3. Users can call the `mint` function to create and mint new NFTs to themselves.
4. The `listNFTs` function can be used to retrieve a list of all NFTs in the marketplace.
5. Users can change the price of their tokens using the `changePrice` function.
6. Other users can buy tokens using the `buy` function by sending enough ether to the contract.
7. The transaction history can be accessed through the `transactionHistory` function.

Note: Make sure to have the required

 amount of ether in your account when calling functions that involve buying or changing token prices.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
