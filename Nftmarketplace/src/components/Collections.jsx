import React from 'react'
import { setGlobalState } from '../store/Data'


const imgBanner = 
            `https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg`

const Collections = () => {
  return (
    <div className='bg-[#4d51d5] gradient-bg-artworks'>
        <div className='w-4/5 py-10 mx-auto'>
            <h4 className='text-white text-3xl font-bold uppercase
            text-gradient'>
                Latest Artworks
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4
            gap-6 md:gap-4 lg:gap-3 py-2.5 '>
                {Array(4).
                fill()
                .map((nft, i) =>(
                    <Card key={i} nft={i +1}/>
                ))}
            </div>
            <div className='text-center my-5'>
            <button className="shadow-lg shadow-black text-white bg-[#b5ba25]
                 hover:bg-[#D3EE70] rounded-full p-2 py-1"> Load More</button>
            </div>
        </div>
    </div>
  )
}

const Card = ({ nft }) => (
   
   <div className='w-full shadow-xl shadow-black  cursor-pointer
   hover:shadow-slate-100 rounded-md overflow-hidden bg-slate-800
   border border-purple-500 p-3 my-2'> 
        <img className='h-60 w-full object-cover shadow-lg shadow-black
        rounded-lg mb-3'
         src={imgBanner} alt='NFT Image'/>
        <h4 className='text-white font-semibold'>NFT #{nft}</h4>
        <p className='text-gray-400 text-sm my-1' >Lorem Ipsum is simply dummy text of the printing 
            and typesetting industry. Lorem Ipsum has been
            the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley 
            of type and scrambled it to make a type specimen 
            book.
        </p>
        <div className='flex justify-between items-center mt-3 text-white'>
            <div className='flex flex-col '>
                <small className='text-xs'>Current Price</small>
                <p className='text-sm font-semibold'>0.34 ETH</p>
            </div >
                <button className="shadow-lg shadow-black bg-[#b5ba25]
                 hover:bg-[#D3EE70] rounded-full px-1.5 py-1"
                 onClick={()=> setGlobalState("showNft", "scale-100")}
                 > View Details</button>
         </div>
   </div>
  )

export default Collections