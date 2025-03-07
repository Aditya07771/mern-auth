import React, { createContext, useState } from 'react';
import { food_items } from '../food';

export const dataContext = createContext();

const UserContextProvider = ({ children }) => {
  const [Cate, setCate] = useState(food_items); 
  const [input, setInput] = useState("");
  const [showCart, setshowCart] = useState(false);

  let data = {
    input,
    setInput,
    Cate, 
    setCate,
    showCart,
    setshowCart
  };

  return (
    <dataContext.Provider value={data}>
      {children}
    </dataContext.Provider>
  );
};

export default UserContextProvider;
