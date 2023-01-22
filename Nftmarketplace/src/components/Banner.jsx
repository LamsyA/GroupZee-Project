// import Identicon from 'react-identicons'
import { setGlobalState, slice, useGlobalState } from '../store/Data'


const imgBanner = `https://vs-lb.com/wp-content/uploads/2021/08/nft-art-explained-a-renaissance-in-the-digital-times-beeple-astro-1024x576.jpg`

const Banner = () => {
    const [connectedAccount]= useGlobalState('connectedAccount')
    const openToggle =() => {
        setGlobalState('modal', 'scale-100')
    }
   
  return (
    <div className='flex flex-col md:flex-row w-4/5
    justify-between items-center mx-auto py-10'>
        <div className='md:w-3/6 w-full'>
            <div>
                <h1 className='text-white text-4xl font-bold'>
                The Premier Platform to Purchase <br/>and Sell
                 Digital Arts, <span className='text-gradient'> NFTs</span> Collections  </h1>
                 <p className='text-gray-600 font-semibold text-sm mt-3'>
                    Collect the Most Coveted NFTs and Mint your own.</p>
            </div>
            <div className='flex mt-5 '>
                <button className='shadow-xl shadow-black text-white
                bg-[#b5ba25] hover:bg-[#D3EE70] md:text-xs p-2 
                rounded-full' 
                onClick={openToggle}>
                    Create NFT </button>
            </div>
            <div className='flex justify-between items-center mt-5 w-3/4 '>
                <div className=' text-white'>
                    <p className='font-bold '>123k</p>
                      <small className='text-teal-300'>Users</small>
                </div>
                <div className=' text-white'>
                    <p className='font-bold '>152k</p>
                      <small className='text-teal-300'>Artworks</small>
                </div>
                <div className=' text-white'>
                    <p className='font-bold '>200k</p>
                      <small className='text-teal-300'>Artists</small>
                </div>
            </div>
        </div>
        <div 
            className='shadow-xl shadow-black md:w-2/5 w-full
            mt-10 md:mt-0 rounded-md overflow-hidden bg-slate-700'>
            <img 
                className='h-60 w-full object-cover'
                src={imgBanner}
                alt='Banner'
            /> 
         <div className='flex justify-start items-center p-3 '>
             {/* <Identicon className="h-10 w-10 object-contain rounded-full mr-3"
             string={"0x21..786a"} size={50} /> */}
             <div>
                <p className='text-white font-semibold '>{slice(connectedAccount,4,4,11)}</p>
                <small className='text-amber-400 font-bold'> @you</small>
             </div>
        </div>
        </div>
    </div>
  )
}

 

export default Banner