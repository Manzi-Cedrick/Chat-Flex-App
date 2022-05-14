import { React,createContext,useState,useContext,useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
const ChatContext = createContext();

const ChatProvider = ({children}) =>{
    // const navigate = useNavigate()
    const [selectedChat, setSelectedChat] = useState([]);
    const [notification, setNotification] = useState([]);
    const [chat_token,setChatToken]=useState([]);
    const [chats, setChats] = useState([]);
    const [userInfo,setInfo] = useState([])
    const [singleLoggedUser,setsingleLoggedUser]= useState([])
    const [chatName,setChatName]= useState([])
    useEffect(() => {
        const token = localStorage.getItem('chat-token');
        if(!token) {
        //   navigate('/');
            console.log("No token")
        }
        setChatToken(token);
      },[])
    return <ChatContext.Provider value={{selectedChat,
        setSelectedChat,
        chat_token,
        setChatToken,
        notification,
        setNotification,
        chats,
        setChats,
        userInfo,setInfo,
        singleLoggedUser,setsingleLoggedUser,
        chatName,setChatName
    }}>{children}</ChatContext.Provider>
}
export default ChatProvider;
export const ChatState =()=>{
    return useContext(ChatContext);
}