const NFTMarketplace = artifacts.require("NFTMarketplace");

module.exports = async (deployer) => {
   const accounts = await web3.eth.getAccounts()
   await deployer.deploy(NFTMarketplace,  'NFT Marketplace', 'ZEE', 5, accounts[1])
}