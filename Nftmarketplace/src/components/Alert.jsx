import React from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import {BsCheck2Circle} from "react-icons/bs"
import { useGlobalState } from '../store/Data'


const Alert = () => {
  const [alert] = useGlobalState("alert")
  return (
    <div
        className={`fixed top-0 left-0 w-screen h-screen
        flex items-center justify-center 
        dark:bg-opacity-50 bg-[#8573e8] bg-opacity-40
        transform transition-transform duration-300
        ${alert.show ? 'scale-100': 'scale-0'}`}>
        <div
        className='flex flex-col justify-center items-center
         bg-[#600be9]  shadow-xl shadow-[#c6dc94]
        rounded-xl min-w-min py-3 px-10 '
        > 
        
        {alert.color =='red'? (
          <FaRegTimesCircle className='text-red-600 text-4xl' />
        ): (
          <BsCheck2Circle className='text-green-600 text-4xl' />
        )}
        
        <p className='text-white' >{alert.msg}</p>
           
        </div>
    </div>
  )
}

export default Alert