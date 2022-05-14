import React, { useState } from 'react'
import { ChatState} from '../../context/ChatProvider'
import ScrollableFeed from 'react-scrollable-feed'
import {isSameSender,isLastMessage}  from './chatLogic';
import { Avatar,Tooltip } from '@chakra-ui/react';
import Profile from './profile';
function Chat_main(props) {
  const [profileModal,setModalOpen] = useState(false)
  const [profile,setProfile]= useState(null)
  const [profileUser,setprofileUser] = useState('')
  const {userInfo,setInfo,selectedChat,setSelectedChat,chat_token,setChatToken,notification,setNotification,chats,setChats,singleLoggedUser,setsingleLoggedUser} = ChatState()
  // console.log("Single Logged",singleLoggedUser)
  return (
      <>
        <ScrollableFeed className='scroll-customise'>
        {props.messages ? (props.messages.map((message,i)=>(
        <div className={`chat-Main ${message.sender._id === singleLoggedUser._id && ' Chat-Receive'} `} key={message._id}>
            {(isSameSender(props.messages,message,i,singleLoggedUser._id) || isLastMessage(props.messages,i,singleLoggedUser._id)) && (
                <Tooltip
                  label={message.sender.name}
                  placement="bottom"
                  hasArrow
                >
                <div className="chat-profile"><Avatar className="avatar" name={message.sender.name} src={message.sender.pic}  onClick={()=>{setprofileUser(message.sender.name);setModalOpen(true);setProfile(message.sender.pic)}} /></div>
                </Tooltip>
            )}
            <div className={`chat-message min-w-[2em] max-w-[4em] break-words ${message.sender._id === singleLoggedUser._id && 'msg_receive'} `}> <span>{message.sender.name}</span> <p>{message.content}</p></div> 
                {profileModal && <Profile profile={profile} profileUser={profileUser} setModalOpen={setModalOpen}/>}
        </div>
        ))):(<>
          <p>Please Enter New Message</p>
        </>)}
        </ScrollableFeed>
        </>
  )
}
export default Chat_main