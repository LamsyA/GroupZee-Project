import React from 'react'
import {FaTimes} from "react-icons/fa"
// import {Identicon} from 'react-identicons'
import {setGlobalState,  slice,  useGlobalState} from '../store/Data'

const imgBanner =
 `https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg`


const NewNFT = () => {

    const [showNft] = useGlobalState('showNft')
    
    const [nft] = useGlobalState('nft')
    const [connectedAccount] = useGlobalState('connectedAccount')

    const onChangePrice = () =>{
        setGlobalState('nft', nft)
        setGlobalState('showNft', "scale-0")
        setGlobalState("updateModal", "scale-100")
    }
        
    
    
    const closeToggle = ()  => {
        setGlobalState('showNft', 'scale-0')
       
    }


  return (
    <div className={`fixed top-0 left-0 w-screen h-screen
    flex items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${showNft}`}>
        <div className='bg-[#010109] shadow-xl shadow-[#3e6192e3]
        rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
            
        <div className='flex flex-col '>
            <div className='flex justify-between item-center text-gray-400'>
                <p className='font-semibold text-gray-400'>Buy NFT</p>
                <button
                type='button'
                onClick={closeToggle}
                className='border-0 bg-transparent focus:outline-none'>
                    <FaTimes/>
                </button>
            </div>

            <div className='flex justify-center items-center 
                rounded-xl mt-5 '>
                <div className='shrink-0 rounded-xl overflow-hidden h-3/5 w-3/5' >
                    <img className='h-full w-full object-cover cursor-pointer'
                        src={nft?.tokenURL} alt={nft?.title} />
                </div>
            </div>
            <div className='flex flex-col justify-start rounded-xl mt-5'>
                <h4 className='text-white font-semibold'> {nft?.title}</h4>
                <p className='text-gray-400 text-xs my-1'>
                {nft?.description}
                </p>
                <div className='flex justify-between items-center mt-3 text-white'>
               <div className='flex justify-start items-center'>
                <div className='flex flex-col justify-center items-start'>
                    <small className='text-white font-bold'>@owner</small>
                    <small className='text-amber-400'>
                        {nft?.owner ?  slice(nft?.owner,4,4,11): ''} </small>
                </div>
                </div>
                <div className='flex flex-col text-white'>
                    <small className='text-xs'>Current Price</small>
                    <p className='text-sm font-semibold'>{nft?.price} ETH</p>
                </div>
                </div>
            </div>
           

            <div className='flex  justify-between items-center space-x-2'>
            {nft?.owner == connectedAccount ? (
                <button className=" flex justify-center items-center
                shadow-lg shadow-black text-white bg-[#b5ba25]
                hover:bg-[#f21404] rounded-full mt-5 w-full p-2 "
                onClick={onChangePrice}
                > 
                Change Price
         </button>
                ): (
                    <button className=" flex justify-center items-center
                        shadow-lg shadow-black text-white bg-[#b5ba25]
                        hover:bg-[#1e0a9a] rounded-full mt-5 w-full p-2 "> 
                        Purchase 
                 </button>
                )}
                
                 
           </div>
        </div>
        </div> 
    </div>
  )
}

export default NewNFT