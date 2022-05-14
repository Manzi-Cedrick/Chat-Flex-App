import React,{useState , useEffect} from 'react'
import './chatNow.css'
import './animate.css'
import Chat_Header from './Chat_Header'
import Chat_main from './Chat_main'
import { FaSmileBeam ,FaPaperPlane } from 'react-icons/fa'
import { Button } from '@chakra-ui/react'
import { ChatState} from '../../context/ChatProvider'
import axios from 'axios'
// import Profile from 
// import io from 'socket.io-client'
// // import Chat_main from './Chat_main'
// const ENDPOINT = 'http://localhost:3500';
// var socket,selectedChatComparer;
function ChatNow() {
  const [newMessage,setNewMessage]= useState('')
  const [messages,setMessages] = useState([])
  const {userInfo,setInfo,selectedChat,setSelectedChat,chat_token,setChatToken,notification,setNotification,chats,setChats,singleLoggedUser,setsingleLoggedUser} = ChatState()
  const fetchMessages = async ()=>{
    if(!selectedChat) return;
    try{
      const config = {
        headers:{
          'Content-type':'Application/json',
          Authorization : 'Bearer ' + chat_token
        }
      }
      const FetChedResult = await axios.get(`http://localhost:3500/api/messages/${selectedChat._id}`,config)
      setMessages(FetChedResult.data)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    fetchMessages()
  }, [selectedChat])
  // useEffect(()=>{
  //   socket = io(ENDPOINT)
  // },[])

  const handedMessageChange =(e)=>{
    setNewMessage(e.target.value)
  }
  const handleMessageSubmit= async (e)=>{
    e.preventDefault()
    try{
      const config ={
        headers: {
          'Content-Type': 'application/json',
          Authorization : 'Bearer ' + chat_token
        },
      }
      setNewMessage('')
      let SendMessages= await axios.post(`http://localhost:3500/api/messages/sendMessage`,{
        content : newMessage,
        chatId : selectedChat._id
      },config)
      SendMessages = SendMessages.data 
      setMessages([...messages,SendMessages])
      // console.log("Fetched Messages",SendMessages)

    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
    <div className="chat-now">
    {selectedChat.length !=0 ?(
        <>
        <Chat_Header/>
        <div className="chat-All">
        <Chat_main messages={messages}/>
        </div>
        <div className="chat-footer">
          <i><FaSmileBeam className='fa fa-smile'/></i>
          <form onSubmit={handleMessageSubmit}>
          <input type="text" placeholder="Type Message" className="chat-input" value={newMessage} onChange={handedMessageChange} />
          <Button leftIcon={<FaPaperPlane />} colorScheme='teal' className="button send-btns" variant='solid' type="submit">Send</Button>
          </form>
        </div>
        </>):(
          <div className="Container">
          <div className="squirtle">
  <div className="tail"></div>
  <div className="body">
    <div className="stomach"></div>
    <div className="shell"></div>
  </div>
  <div className="head">
    <div className="eye"></div>
    <div className="eye"></div>
    <div className="mouth"></div>
  </div>
  <div className="leg back"></div>
  <div className="leg"></div>
  <div className="arm back"></div>
  <div className="arm"></div>
</div>
      <h1>
        Welcome, <span>{singleLoggedUser.name}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
        )}
    </div>
    </>
  )
}

export default ChatNow