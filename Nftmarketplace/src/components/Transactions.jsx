import React, { useEffect, useState } from 'react'
import {VscArrowSwap} from 'react-icons/vsc'
import {MdOpenInNew} from 'react-icons/md'
import { slice, useGlobalState } from '../store/Data'

const Transactions = () => {
   const [transactions] = useGlobalState("transactions")
   const [end, setEnd] = useState(3)
   const [count] = useState(3)
   const [collection, setCollection] = useState([])

   const getCollection = () => {
       return transactions.slice(0, end)
   }

   useEffect(() => {
       setCollection(getCollection())
   },[transactions,end])
  return (
    <div className='bg-[#4d51d5]'>
        <div className='w-4/5 py-10 mx-auto'>
            <h4 className='text-white text-3xl font-bold
            uppercase text-gradient '> 
             {collection.length >0 ? "Latest Transactions" : "No Transaction Yet"}
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                gap-6 md:gap-4 lg:gap-2 py-2.5 '>
                    {collection
                    .map((tx, i) =>(
                        <Transaction key={i} tx={tx}/>
                    ))}
                </div>
                {collection.length > 0 && transactions.length > collection.length ? (
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

const Transaction = ({tx}) => (
    <div className='flex justify-between items-center border border-yellow-500
    text-slate-400 w-full shadow-xl shadow-black hover:shadow-slate-100 rounded-md
    cursor-pointer overflow-hidden bg-gray-800 my-2 p-3 '>
       <div className='rounded-md shadow-sm shadow-yellow-500 p-2'>
       <VscArrowSwap/>
       </div>
        <div>
            <h4 className='text-sm'>Fund Transferred</h4>
            <small className='flex justify-start items-center'>
                <span className='mr-1'>Bought by</span>
                <a className='text-amber-400 mr-2' href="#" target="_blank">{slice(tx.owner,4,4,11)}</a>
                <span>
                    <MdOpenInNew />
                </span>
            </small>
        </div>
        <p className='text-sm font-medium'>{tx.price}ETH</p>
    </div>
)

export default Transactions