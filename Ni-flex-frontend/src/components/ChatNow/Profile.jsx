import React from 'react'
import './profile.css'
import  ReactDOM  from 'react-dom'
import { CloseButton } from '@chakra-ui/react'
function Profile({profile,profileUser,setModalOpen}) {
  if(!profileModal) return null;
  const onClose=()=>{
    setModalOpen(false)
  }
  return ReactDOM.createPortal(
    <>
    <div className="user-profile" onClick={onClose}>
        <div className="profile-box">
            <CloseButton onClick={onClose}/>
            <div className="profile-img-sender"><img src={`${profile}`} alt="gorillaa" /></div>
            <div className="profile-name">
                <h2>{profileUser}</h2>
                <div className="profile-status-online"><div className="profile-status"></div><span>Online</span></div>
            </div>
        </div>
    </div>
    </>,document.getElementById("portal")
  )
}

export default Profile