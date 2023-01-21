import React from 'react'
import nftLogo from "../assets/nft.png"

const Footer = () => {
  return (
    <div className='w-ful flex flex-col md:justify-center justify-between 
    items-center gradient-bg-footer p-4'>
        <div className='w-full flex sm:flex-row flex-col justify-between
        item-center my-4 '>
            <div className='flex flex-[0.25] justify-center items-center' >
                <img  className='w-32'
                src={nftLogo} alt='nft' />
            </div>
            <div className='flex flex-1 sm:mt-0 mt-5 w-full text-white 
            justify-evenly items-center flex-wrap text-base text-center'>
                <p className='cursor-pointer mx-2'> Market </p>
                <p className='cursor-pointer mx-2'> Artist </p>
                <p className='cursor-pointer mx-2'> Features </p>
                <p className='cursor-pointer mx-2'> Community </p>
            </div>
            <div className='flex flex-[0.25] justify-center items-center'>
                <p className='text-white text-right text-sm '>&copy;2023 All right reserved</p>
            </div>
        </div>
    </div>
  )
}

export default Footer