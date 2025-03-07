import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import categories from '../category';
import Card from '../components/Card';
import { food_items } from '../food';
import { dataContext } from '../context/UserContextProvider';
import { RxCross2 } from 'react-icons/rx'
import Card2 from '../components/Card2';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const Home = () => {
  let {Cate, setCate, input, showCart, setshowCart} = useContext(dataContext);
  function filter(category){
    if(category==="All"){
      setCate(food_items);
    }else{
      let newList = food_items.filter((items)=>(
        items.food_category===category
      ))
      setCate(newList)
    }
  }
  
  let items=useSelector(state=>state.cart)

  let subtotal = items.reduce(function(total,item){
    return total + item.qty*item.price
  },0)

  let deliveryFee = 20;
  let taxes = subtotal*0.5/100;
  let total = Math.floor(subtotal+deliveryFee+taxes);


  console.log(subtotal)

  return (
    <div>
      <Navbar />
      {!input?<div className='flex flex-wrap justify-center items-center gap-6 w-[100%]'>
        {categories.map((item) => (
          <div key={item.name} className='w-[140px] h-[150px] bg-white flex flex-col items-start gap-5 p-5 justify-start text-[16px] font-semibold text-gray-600 rounded-b-lg shadow-xl hover:bg-green-200 cursor-pointer transition-all duration-200' onClick={()=>filter(item.name)}>
            <p>{item.icons}</p>  {/* Display the icons  */}
            <p>{item.name}</p>
          </div>
        ))}
      </div>:null}
      
      <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8'>
        {Cate.length>1?Cate.map((items)=>(
  <Card name={items.food_name} image={items.food_image} id={items.id} type={items.food_type} price={items.price}/>
)):<div className='text-center text-2xl text-green-500 font-semibold p-8' >No Dish Found</div>}
      </div>
      <div className={`w-full md:w-[40vw] h-[100%] fixed top-0 right-0 bg-white shadow-xl p-6 transition-all  duration-500 flex flex-col items-center overflow-auto ${showCart?"translate-x-0":"translate-x-full"}`}>

        <header className=' w-full flex justify-between'>
          <span className='text-green-400 text-[20px] font-semibold'>Order Items</span>
        <RxCross2 className='w-[30px] h-[30px] text-green-400 text-[20px] font-semibold cursor-pointer hover:text-gray-600 cursor-poin' onClick={()=>setshowCart(false)}/>

        </header>
        {items.length>0?<><div className='w-full flex flex-col mt-9 gap-8'>
          {items.map((item) => (
            <Card2 name={item.name} image={item.image} price={item.price} id={item.id} qty={item.qty} />
          ))}
        </div><div className='w-full border-t-2 border-b-2 border-gray-400 mt-7 flex flex-col gap-2 p-8'>
            <div className='flex justify-between items-center'>
              <span className='text-lg text-semibold text-gray-600'>Subtotal</span>
              <span className='text-lg text-semibold text-green-400 text-md'>Rs. {subtotal}/-</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-lg text-semibold text-gray-600'>Delivey Fee</span>
              <span className='text-lg text-semibold text-green-400 text-md'>Rs. {deliveryFee}/-</span>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-lg text-semibold text-gray-600'>Taxes</span>
              <span className='text-lg text-semibold text-green-400 text-md'>Rs. {taxes}/-</span>
            </div>
          </div><div className='w-full'>
            <div className='flex justify-between items-center px-9 pt-4'>
              <span className='text-2xl text-bold text-gray-900'>Total</span>
              <span className='text-lg text-semibold text-green-400 text-md'>Rs. {total}/-</span>
            </div>
            <button className='w-[95%] h-[40px] ml-4 mt-5 bg-green-400 rounded-lg text-white cursor-pointer font-semibold hover:bg-green-300 transition-all' onClick={()=>toast.success("Order Placed")}>Place Order</button>
          </div></>: 
        <div className='text-center text-2xl text-green-500 font-semibold p-8'>
          Empty Cart
        </div>
        
        }
        
      </div>
    </div>
  );
}

export default Home;
