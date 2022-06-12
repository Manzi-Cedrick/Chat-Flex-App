import React,{ useEffect, useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { ChatState} from '../../context/ChatProvider'
import './search.css'
function Search() {
  const {userInfo,setInfo,selectedChat,setSelectedChat,chat_token,setChatToken,notification,setNotification,chats,setChats,chatName,setChatName} = ChatState()
  const [searchText,setsearchText]=useState('')
  const toast = useToast()
  const handleSubmits = async (event) =>{
    event.preventDefault()
    if(searchText.trim() === ""){
      toast({title: 'Enter Valid Info',description: "Enter Something in search",status: 'warning',duration: 9000,isClosable: true,position:'top-left'}) 
    }
    try{
          const data = await axios.get(`http://localhost:3500/api/user?search=${searchText}`,{
            headers:{
              'Content-type':'Application/json',
              Authorization: `Bearer ${chat_token}`
            }
          })
          console.log(data)
        }catch(error){
          console.log(error)
        }
        setsearchText('')
      }
      const handleSearch=(event)=>{
        setsearchText(event.target.value)
      }
      const [currentRoom, setCurrentRoom] = useState("");
      const accessChat = async (userId,chatUsername)=>{
        try{
          const config = {
            headers:{
              'Content-type':'Application/json',
              Authorization:   'Bearer ' + chat_token
            }
          }
          const {data}= await axios.post(`http://localhost:3500/api/chatNow/`,{
            headers:{'Content-Type':'Application/json',Authorization: 'Bearer ' + chat_token
          },
            body:{
            userId:userId,
            chatName:chatUsername
          }});
            setSelectedChat(data);
            setCurrentRoom(userId);
            console.log("Chat NameArray",chatName);
          }catch(error){
            console.log(error)
          }
          console.log('Handle Chats',chats)
        }
        return (
          <div className="search">
        <div className="flex w-full justify-between title">
        <p className="text-white font-bold">Chat Flex</p>
        <button className="group">New Group</button>
        </div>
        <div className="search-input flex justify-center m-auto w-full">
            <form onSubmit={handleSubmits}>
            <input type="search" placeholder="Search Chats" value={searchText} onChange={handleSearch}/>
            <Button leftIcon={<FaSearch />} colorScheme='teal' className="button" variant='solid' type="submit">Search</Button>
            </form>
        </div>
        <div className="chat-container">
        <div className="chat-manage">
        {chatName ? (
        chatName.map((chat) =>(
        <div key={chat._id} className={`text-white  ${currentRoom === chat._id && ' chatters'} chat-each`} onClick={()=>accessChat(chat._id,chat.chatName)}>
        <div className="chat-Names">
        <p>{chat.chatName}</p></div></div>
        ))
        ):(
        userInfo.map((user) =>(
        <div key={user._id} className={`text-white  ${currentRoom === user._id && ' chatters'} chat-each`} onClick={()=>accessChat(user._id,user.name)}>
        <div className="chat-profile"><img src={`${user.pic}`} alt="No image" className="h-full images w-full" /></div>
        <div className="chat-Names">
        <p>{user.name}</p><span>Yooo</span></div></div>
        )))
       }
        </div>
        <div className="chat-manage">
          {/* {} */}
        </div>
        </div>
    </div>
  )
}

export default Search