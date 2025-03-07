import React, { useContext, useEffect } from 'react';
import { MdFastfood } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { dataContext } from '../context/UserContextProvider';
import { food_items } from '../food';
import { useSelector } from 'react-redux';

const Navbar = () => {
 
  const { input, setInput, cate, setCate, showCart, setshowCart } = useContext(dataContext);
  useEffect(()=>{
    let newList =food_items.filter((items)=>items.food_name.includes(input)||items.food_name.toLowerCase().includes(input)); 
    setCate(newList)
  }, [input])

  let items=useSelector(state=>state.cart)
  console.log(items)

  return (  
    <div className='w-full h-[100px] flex justify-between items-center px-5'>
      <div className='w-[60px] h-[60px] flex justify-center items-center text-green-400 bg-white rounded-md shadow-xl'>
        <MdFastfood className='w-[30px] h-[30px]' />
      </div>
      <form 
        className='w-[60%] h-[60px] bg-white flex items-center px-5 gap-5 rounded-md shadow-xl' 
        onSubmit={(e) => e.preventDefault()}  
      >
        <FaSearch className='text-green-400 w-[20px] h-[20px]' />
        <input
          type="text"
          placeholder='Search Items....'
          className='w-[100%] outline-none text-[20px]'
          value={input} 
          onChange={(e) => setInput(e.target.value)}  
        />
      </form>
      <div className='relative w-[60px] h-[60px] flex justify-center items-center text-green-400 bg-white rounded-md shadow-xl' onClick={()=>setshowCart(true)}>
        <FiShoppingBag className='w-[30px] h-[30px] cursor-pointer'/>
        <span className='absolute top-0 right-3 text-green-400 font-bold'>{items.length}</span>
      </div>
    </div>
  );
};

export default Navbar;
