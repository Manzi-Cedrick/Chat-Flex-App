import React,{useEffect} from 'react'
import './header.css'
import { ChatState} from '../../context/ChatProvider'
import {useNavigate} from 'react-router-dom'
import { FaFacebookMessenger , FaSignOutAlt } from 'react-icons/fa'
function Header() {
  
  const navigate = useNavigate()
  const handleLogout =()=>{
    const Logout= localStorage.removeItem('chat-token');
    navigate('/');
    console.log('Hello')

  }
  return (
    <div className="header">
        <div className="logo"><span>C</span></div>
        <div className="logo2"><img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="no image" className="rounded-full" /></div>
        <div className="message"><FaFacebookMessenger/></div>
        <div className="logout"><FaSignOutAlt onClick={handleLogout} className="cursor-pointer"/></div>
    </div>
  )
}

export default Header