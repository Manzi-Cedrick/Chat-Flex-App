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
  console.log('handle',chats)
  const handleSubmits = async (event) =>{
    event.preventDefault()
    if(searchText.trim() === ""){
      toast({title: 'Enter Valid Info',description: "Enter Something in search",status: 'warning',duration: 9000,isClosable: true,position:'top-left'}) 
    }
    try{
      const config = {
        headers:{
          'Content-type':'application/json',
          Authorization: `Bearer ${chat_token}`
        }
      }
      const data = await axios.get(`http://localhost:3500/api/user/search=${searchText}`,config)
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
  const accessChat = async (userId)=>{
    try{
      const config = {
        headers:{
          'Content-type':'Application/json',
          Authorization:   'Bearer ' + chat_token
        }
      }
      console.log(userId)
      const {data}= await axios.post(`http://localhost:3500/api/chatNow/`,{userId},config);
      
      setSelectedChat(data);
      setCurrentRoom(userId);
      // console.log(currentRoom);
    }catch(error){
      console.log(error)
    }
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
        {userInfo.map((user) =>(
        <div key={user._id} className={`text-white  ${currentRoom === user._id && ' chatters'} chat-each`} onClick={()=>accessChat(user._id)}>
        <div className="chat-profile"><img src={`${user.pic}`} alt="No image" className="h-full images w-full" /></div>
        <div className="chat-Names">
        <p>{user.name}</p><span>Yooo</span></div></div>
        ))}
        </div>
        <div className="chat-manage">
          {/* {} */}
        </div>
        </div>
    </div>
  )
}

export default Search