import React, { useEffect, useState } from "react"
import {  AllNFTs, isWalletConnected } from "./Blockchain.services"
import Alert from "./components/Alert"
import Banner from "./components/Banner"
import Collections from "./components/Collections"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Loader from "./components/Loader"
import MintNFT from "./components/MintNFT"
import NewNFT from "./components/NewNFT"
import Transactions from "./components/Transactions"
import Update from "./components/Update"



function App() {
  const [loaded, setLoaded] = useState(false)

  useEffect (  () => {
    const loadData = async () => {
      console.log('Blockchain loaded')
      setLoaded(true);
       const result = await isWalletConnected()
       await AllNFTs()
      };
      loadData();
    },[])

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
      <Header/>
      <Banner />
      </div>
      <Collections />
      <Transactions/>
      <Footer/>
      <MintNFT/>
      <NewNFT/>
      <Update />
      <Loader/>
      <Alert/>
      
      
  
    </div>
  )
}

export default App
