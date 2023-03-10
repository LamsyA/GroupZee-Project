import React, { useState } from 'react'
import { useEffect } from 'react'
import { setGlobalState, useGlobalState } from '../store/Data'



const Collections = () => {
    const [nfts] = useGlobalState("nfts")
    const [end, setEnd] = useState(3)
    const [count] = useState(3)
    const [collection, setCollection] = useState([])

    const getCollection = () => {
        return nfts.slice(0, end)
    }

    useEffect(() => {
        setCollection(getCollection())
    },[nfts,end])
  return (
    <div className='bg-[#4d51d5] gradient-bg-artworks'>
        <div className='w-4/5 py-10 mx-auto'>
            <h4 className='text-white text-3xl font-bold uppercase
            text-gradient'>
                {collection.length >0 ? "Latest NFTs" : "No NFTs"}
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4
            gap-6 md:gap-4 lg:gap-3 py-2.5 '>
                {collection.map((nft, i) =>(
                    <Card key={i} nft={nft}/>
                ))}
            </div>
            {collection.length > 0 && nfts.length > collection.length ? (
                <div className='text-center my-5'>
                <button className="shadow-lg shadow-black text-white bg-[#b5ba25]
                     hover:bg-[#D3EE70] rounded-full p-2 py-1"
                     onClick={() => setEnd(end + count)}
                     > Load More</button>
                </div>
            ):
            null}
            
        </div>
    </div>
  )
}

const Card = ({ nft }) => {

    const getNft =() =>{
        setGlobalState("nft", nft)
        setGlobalState("showNft", "scale-100")

    }
    return(
        <div className='w-full shadow-xl shadow-black  cursor-pointer
   hover:shadow-slate-100 rounded-md overflow-hidden bg-slate-800
   border border-purple-400 p-3 my-2'> 
        <img className='h-60 w-full object-cover shadow-lg shadow-red-500
        rounded-lg mb-5  border border-white '
         src={nft.tokenURL} alt={nft.title}/>
        <h4 className='text-white font-semibold'>{nft.title}</h4>
        <p className='text-gray-400 text-sm my-1' >{nft.description}
        </p>
        <div className='flex justify-between items-center mt-3 text-white'>
            <div className='flex flex-col '>
                <small className='text-xs'>Current Price</small>
                <p className='text-sm font-semibold'>{nft.price} ETH</p>
            </div >
                <button className="shadow-lg shadow-black bg-[#b5ba25]
                 hover:bg-[#D3EE70] rounded-full px-1.5 py-1"
                 onClick={getNft}
                 > View Details</button>
         </div>
   </div>
    )
}

export default Collections