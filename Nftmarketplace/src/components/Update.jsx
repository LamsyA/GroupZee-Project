import React from 'react'
import {FaTimes} from "react-icons/fa"
import {useState} from 'react' 
import {setAlert, setGlobalState, setLoadingMsg, useGlobalState} from '../store/Data'
import { updatePrice } from '../Blockchain.services'

const imgBanner =
 `https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjEtMDYvNGE4NmNmOWQtODM2Mi00YmVhLThiMzctZDEyODAxNjUxZTE1LmpwZWc=.jpg`


const Update = () => {

    const [modal] = useGlobalState('updateModal')
    const [nft] = useGlobalState('nft')

    const [price, setPrice] = useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!price || price <= 0) return

        setGlobalState("modal", "scale-0")
        setLoadingMsg("Price change in progress...")
        console.log("Updated.....")

        try {
            setLoadingMsg("Updating Price...")
            setGlobalState("updateModal", "scale-0")

            const result = await updatePrice({tokenId: nft.id, newPrice: price})

            if (result === true ) { 
                 setAlert('Price Updated Successfully!..')}
            else  { 
                 setAlert("Failed to update", "red") }
            
            closeToggle()
            window.location.reload()
        } catch (error) {
            console.log("error updating price", error)
            setAlert("Update Failed!", 'red')
        }
    }
    
    const closeToggle = ()  => {
        setGlobalState('updateModal', 'scale-0')
        resetForm()
    }


    const resetForm = () => {

        setPrice('')
    }

  return (
    <div className={`fixed top-0 left-0 w-screen h-screen
    flex items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${modal}`}>
        <div className='bg-[#010109] shadow-xl shadow-[#3e6192e3]
        rounded-xl w-11/12 md:w-2/5 h-7/12 p-6'>
            
        <div className='flex flex-col '>
            <div className='flex justify-between item-center text-gray-400'>
                <p className='font-semibold text-gray-400'>Update NFT Price</p>
                <button
                type='button'
                onClick={closeToggle}
                className='border-0 bg-transparent focus:outline-none'>
                    <FaTimes/>
                </button>
            </div>

            <div className='flex justify-center items-center 
                rounded-xl mt-5 '>
                <div className='shrink-0 rounded-xl overflow-hidden h-20 w-20' >
                    <img className='h-full w-full object-cover cursor-pointer'
                        src={nft?.tokenURL} alt='NFT' />
                </div>
            </div>
         
           
            <div className='flex justify-between items-center bg-gray-800
            rounded-xl mt-5'>
                    <input 
                    className='block w-full text-sm text-slate-500 
                    focus:outline-none focus:ring-0 p-2 
                   bg-transparent border-0'
                     type='number'  
                     placeholder={nft?.price}
                     name='price'
                     onChange={(e) => setPrice(e.target.value)} 
                     value={price}
                     min= {0.01}
                     step={0.01}            
                    required/>
            </div>
           
                <button
                type='submit' className=" flex justify-center items-center
                  shadow-lg shadow-black text-white bg-[#b5ba25]
                 hover:bg-[#D3EE70] rounded-full mt-5 p-2 "
                 onClick={handleSubmit} > Update Now </button>
        </div>
        </div> 
    </div>
  )
}

export default Update