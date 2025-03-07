import React from 'react'
import "./appstyles.css"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import {ToastContainer} from 'react-toastify'



const App = () => {
  return (
    <div className='w-full min-h-screen bg-slate-200'>
      <Home />
    <ToastContainer/>
    </div>
    
  )
}

export default App