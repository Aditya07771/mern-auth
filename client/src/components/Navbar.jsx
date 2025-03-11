import React, { useContext } from 'react'
import {assets} from "../assets/assets.js"
import {useNavigate} from "react-router-dom";
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate();
  const {userData, backendUrl, setUserData, setIsloggedin} = useContext(AppContext)

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
  
      console.log("OTP Response:", data); // Debugging log
  
      if (data.sucess) { // Check for "sucess" instead of "success"
        toast.success(data.message);
        console.log("Navigating to /email-verify"); // Debugging
        navigate("/email-verify"); // Attempt to navigate
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("OTP Request Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  
  

  const Logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');
  
      if (data.success) {
        setIsloggedin(false);
        setUserData(null); // Set to null instead of false
        toast.success("Logged out successfully");
        
        // Ensure state updates before navigating
        setTimeout(() => {
          navigate('/');
        }, 100); 
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  

  return (
    <div className=' w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
        <img src={assets.logo} alt="LOGO" className='w-28 sm:w-32'/>
        {
          userData?
          <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
            {userData.name[0].toUpperCase()}
            <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>

              <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              {!userData.isAccountVerified && <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li>}
                
                <li onClick={Logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Logout</li>
              </ul>
            </div>
          </div>
          :<button className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 cursor-pointer hover:bg-gray-100 transition-all' onClick={()=>navigate('/login')}>Login <img src={assets.arrow_icon} alt="" /></button>
        }

        
    </div>
  )
}

export default Navbar