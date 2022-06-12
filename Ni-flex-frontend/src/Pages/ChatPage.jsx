import React,{ useEffect, useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Header from '../components/Header/Header'
import Search from '../components/Search/search'
import ChatNow from '../components/ChatNow/ChatNow'
import { ChatState} from '../context/ChatProvider'
import {useNavigate} from 'react-router-dom';
import '../App.css'
function ChatPage() {
  const {selectedChat,setSelectedChat,chat_token,setChatToken,notification,setNotification,chats,setChats,userInfo,setInfo,singleLoggedUser,setsingleLoggedUser,chatName,setChatName} = ChatState()
  const navigate = useNavigate();
    const fetchData = async (token) =>{
        const decoded_token=jwt_decode(token)
        const searchId=decoded_token.id
        const request = await axios.get('http://localhost:3500/api/user',{
          headers: {'Content-type':'Application/json', Authorization: 'Bearer '+ decoded_token}
        });
        const LoggedUser = await axios.get(`http://localhost:3500/api/user/${searchId}`,{
          headers: {'Content-type':'Application/json', Authorization: 'Bearer '+ decoded_token}
        });
        const ChatName = await axios.get(`http://localhost:3500/api/chatNow`,{
          headers: {'Content-type':'Application/json', Authorization: 'Bearer '+ decoded_token}
        });
        const ChatNamesAll= ChatName.data
        const dataUser = request.data
        const userData = LoggedUser.data
        setsingleLoggedUser(userData);
        setInfo(dataUser)
        console.log("User Info :",userInfo)
        setChatName(ChatNamesAll)
    }
    useEffect(() => {
      const token = localStorage.getItem('chat-token');
      fetchData(token);
      if(!chat_token){
        navigate('/')
      }
    },[chat_token])
  return (
    <>
    <div className="flex">
    <Header/>
    {/* <div>{chats.map((chat) =>(
        <div key={chat._id} className={`text-white`}>{chat.chatName}</div>
    ))}</div> */}
    <Search />
    <ChatNow/>
    </div>
    </>
  )
}

export default ChatPage