import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: { // reducer kuch nai bass ek functionality
        AddItem: (state, action) => { // state -> ke pass initialState ka access hai and action kya hai ki joh arrgument denge in addItem main 
            const existingItem = state.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return state.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            } else {
                return [...state, action.payload]; // New state with the added item // state. likha hai kqunki state(array) ke andar data store karenge 
            }
        },
        RemoveItem: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        incrementQty: (state, action) => {
            return state.map((item) =>
                item.id === action.payload ? { ...item, qty: item.qty + 1 } : item
            );
        },
        DecrementQty: (state, action) => {
            return state.map((item) =>
                item.id === action.payload ? { ...item, qty: item.qty - 1 } : item
            );
        }
    }
});

export const { AddItem, RemoveItem, incrementQty, DecrementQty } = cartSlice.actions;
export default cartSlice.reducer;

/*{
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:[],
    reducers:{ // reeducer kuch nai bass ek functionality 
        AddItem:(state, action)=>{ // state -> ke pass initialState ka access hai and action kya hai ki joh arrgument denge in addItem main 
            let esistItem = state.find((item)=>item.id === action.payload.id)
            
            if(esistItem){
                return state.map((item)=>(item.id===action.payload.id?{...item,qty:item.qty+1}:item))
            }else{
                return [...state, action.payload]; // New state with the added item // state. likha hai kqunki state(array) ke andar data store karenge 
            }

        },
        RemoveItem:(state, action)=>{
            return state.filter((item) => item.id !== action.payload)
        },
        incrementQty:(state, action)=>{
            return state.map((item)=>(item.id===action.payload.id?{...item,qty:item.qty+1}:item))


        })
        
    }
})

export const {AddItem, RemoveItem, incrementQty} = cartSlice.actions
export default cartSlice.reducer}*/