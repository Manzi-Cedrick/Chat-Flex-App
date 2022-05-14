import React,{useState,useEffect} from 'react'
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
import { useNavigate} from 'react-router-dom'

function HomePage() {
const navigate = useNavigate()
useEffect(() => {
  const token = localStorage.getItem('chat-token');
  if(token) {
    navigate('/chats');
  }
},[])
const [signUp,setsignUp]=useState(false);
const [loginUp,setLoginUp]=useState(true);
const toggleCompo = () =>{
  setLoginUp(false);
  setsignUp(true);
}
const toggleCompo2 = ()=>{
  setLoginUp(true);
  setsignUp(false);
}
  return (
      <>
      <div className="Page-Container">
    <div className="flex toggle justify-evenly mt-5 m-auto h-12 bg-white">
    <button className={`text-black  ${loginUp && ' text-white bg-blue-500 h-10 w-44 rounded-full'}`} onClick={toggleCompo2}>Login</button>
    <button className={`text-black  ${signUp && 'text-white bg-blue-500 h-10 w-44 rounded-full'}`} onClick={toggleCompo}>{signUp && <SignUp/>}Sign Up</button>
  </div>
  {loginUp && <Login/>}
  </div>
  </>
  )
}

export default HomePage