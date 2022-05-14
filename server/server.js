const express = require('express');
const app = express();
const chatdata = require('./dummyData');
const cors= require('cors');
const connection = require('./config/dbConnect')
const AuthRoutes=require('./routes/UserRoutes')
const ChatRoutes = require('./routes/ChatRoutes')
const MessageRoutes = require('./routes/MessageRoutes')
const bodyparser = require('body-parser');
const User = require('./models/UserModel');
const Chat = require('./models/ChatModel');
require('colors')
require('dotenv').config()
connection();
app.use(cors());
app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));
app.use('/api/chat',AuthRoutes);
app.use('/api/chatNow',ChatRoutes);
app.use('/api/messages',MessageRoutes)
app.get('/api/user', async (req,res)=>{
    const userData = await User.find()
    res.send(userData);
})
app.get('/api/user/:id',async (req,res)=>{
    const singlechat= await User.findById(req.params.id);
    res.send(singlechat);
})
app.get('/api/chat', async (req,res)=>{
    const ChatInfo = await Chat.find();
    res.send(ChatInfo);
})
app.get('/api/chat/:id',async (req,res)=>{
    const singlechat= chatdata.find((chat)=> (chat._id==req.params.id));
    console.log(singlechat);
    res.send(singlechat);
})
const PORT = process.env.PORT
app.listen(PORT,()=>{console.log(`Port Running Successfuly on Port ${PORT}`.cyan.bold)})    
// const io = require('socket.io')(server,{
//     pingTimeout : 60000,
//     cors:{
//         origin : 'http://localhost/3000',

//     }
// })
// // io.on('connection',(socket)=>{
// //     console.log('Connected to socket',socket)
// // })