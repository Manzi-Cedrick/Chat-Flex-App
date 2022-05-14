import React from 'react'
import { FaFileAlt, FaVideo, FaPhone } from 'react-icons/fa'
import { ChatState} from '../../context/ChatProvider'

function Chat_Header() {
  const {userInfo,setInfo,selectedChat,setSelectedChat,chat_token,setChatToken,notification,setNotification,chats,setChats,} = ChatState()

  return (
    <div className="chat-header w-full h-12 border-2 border-solid border-white flex ">
    <div className="chat-image">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" className="w-full h-full" alt="no image" />
    </div>
    <span>{selectedChat.chatName}</span>
    <div className="Icons">
        <i><FaFileAlt/></i>
        <i><FaVideo/></i>
        <i><FaPhone/></i>
    </div>
    </div>
  )
}

export default Chat_Header