import Web3 from 'web3';
import { setGlobalState, getGlobalState } from './store/Data'
 import abi from "../build/contracts/NFTMarketplace.json"


 const { ethereum } = window
window.web3 = new Web3(ethereum)
window.web3 = new Web3(window.web3.currentProvider)

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const web3 = window.web3
    const networkId = await web3.eth.net.getId()
    const networkData = abi.networks[networkId]

    if (networkData) {
      const contract = new web3.eth.Contract(abi.abi, networkData.address)
      return contract
    } else {
      return null
    }
  } else {
    return getGlobalState('contract')
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0].toLowerCase())
  } catch (error) {
    reportError(error)
  }
}

const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
      await isWalletConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const structuredNfts = (nfts) => {
  return nfts
    .map((nft) => ({
      id: Number(nft.id),
      owner: nft.owner.toLowerCase(),
      price: window.web3.utils.fromWei(nft.price),
      title: nft.title,
      description: nft.description,
      tokenURL: nft.tokenURL,
      timestamp: nft.timestamp,
    }))
    .reverse()
}

const AllNFTs = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEthereumContract()
    const nfts = await contract.methods.listNFTs().call()
    const transactions = await contract.methods.transactionHistory().call()
    console.log('Transaction :',structuredNfts(transactions))
    console.log("NFT's:...",structuredNfts(nfts))

    setGlobalState('nfts', structuredNfts(nfts))
    setGlobalState('transactions', structuredNfts(transactions))
  } catch (error) {
    reportError(error)
  }
}

const mintNFT = async ({metadataURI,title, description,   price }) => {
  try {
    price = window.web3.utils.toWei(price.toString(), 'ether')
    //  console.log("price..",p)
    const contract = await getEthereumContract()
    console.log("contract", contract)
    const account = getGlobalState('connectedAccount')
    // console.log(account)
    // const mintingCost = window.web3.utils.toWei('0.01', 'ether')
    // console.log("minted price", mintingCost)
   const value =  await contract.methods.mint(metadataURI,title, description,   price).send({from: account})
   console.log("Value..", value)
   window.location.reload()
    // return true
  } catch (error) {
    console.error(error)
    reportError(error)
  }
}

const purchaseNft = async (tokenId,  newPrice) => {
  try {
    newPrice = window.web3.utils.toWei(newPrice.toString(), 'ether')
    const contract = await getEthereumContract()
    const connectedAccount = getGlobalState('connectedAccount')
   const buyNew = await contract.methods.buy(Number(tokenId))
   .send({ from: connectedAccount, value: newPrice })
   
   return true
  } catch (error) {
    reportError(error)
  }
}

const updatePrice = async ({  tokenId, newPrice}) => {
  try {
    newPrice = window.web3.utils.toWei(newPrice.toString(), 'ether')
    console.log("price...",newPrice)
    const contract = await getEthereumContract()
    const account = getGlobalState('connectedAccount')

   const ch = await contract.methods.changePrice(Number(tokenId), newPrice).send({ from: account })
   console.log("ch...:", ch)
  } catch (error) {
    reportError(error)
  }
}

const reportError = (error) => {
  // setAlert(JSON.stringify(error), 'red')
  // throw new Error('No ethereum object.')
}

export {
  AllNFTs,
  connectWallet,
  getEthereumContract,
  mintNFT,
  purchaseNft,
  updatePrice,
  isWalletConnected,
}