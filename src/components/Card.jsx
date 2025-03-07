import React from 'react'
import image1 from '../assets/image1.avif'
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { AddItem } from '../redux/cartSlice';
import { toast } from 'react-toastify';

const Card = ({name, image, price, id, type}) => {
  let dispatch=useDispatch()
  return (
    <div className=' w-[300px] h-[400px] flex flex-col gap-3 p-5 bg-white hover:border-2 border-green-400'>
        <div className='w-[100%] h-[60%] overflow-hidden rounded-lg '>
            <img src={image} alt="" className='object-cover'/>
        </div>
        <div className='text-2xl font-semibold '>{name}</div>
        <div className='w-full flex justify-between items-center'>
            <div className='text-lg font-semibold text-green-400'>Rs. {price}/-</div>
            <div className='flex justify-center items-center text-lg gap-2 font-semibold text-green-400'> {type==="veg"? <LuLeafyGreen /> : <GiChickenOven/>} <span> {type} </span></div>
        </div>
        <button className='w-full h-[40px] bg-green-400 rounded-lg text-white cursor-pointer font-semibold hover:bg-green-300 transition-all' onClick={()=>{dispatch(AddItem({id:id, name:name, image:image, price:price, qty:1})); toast.success("item Added")}}>Add to Dish</button>
    </div>
  )
}

export default Card