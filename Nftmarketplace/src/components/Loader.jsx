import React from 'react'
import { useGlobalState } from '../store/Data'

const Loader = () => {
    const [loader] = useGlobalState('loader')
  return (
    <div
        className={`fixed top-0 left-0 w-screen h-screen flex
        items-center justify-center bg-[#8573e8] bg-opacity-40
        transform transition-transform duration-300 ${loader.show ? 
        "scale-100": "scale-0"}`}>
        <div
        className='bg-[#600be9]  shadow-xl shadow-[#ccdd81]
        rounded-xl min-w-min px-10 pb-2 '
        > 
            <div
            className='flex flex-col text-white'
            > <div className='flex justify-center items-center'>
            <div className='lds-dual-ring  scale-50'>  </div>
                <p className='text-lg'>Please wait ...</p>      
                </div>
                <small className='text-center'>{loader.msg}</small>
            </div>
        </div>
    </div>
  )
}

export default Loader