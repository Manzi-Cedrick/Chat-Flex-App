import React from 'react';
import './App.css'
import { Routes ,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
// import { ChatState} from '../context/ChatProvider'

function App() {
  // const {userInfo,setInfo,selectedChat,setSelectedChat,chat_token,setChatToken,notification,setNotification,chats,setChats,} = ChatState()
  
  return (
    <>
    <div className="App">
      
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/chats' element={<ChatPage/>}></Route>
        </Routes>
    </div>
    </>
  )
}

export default App
