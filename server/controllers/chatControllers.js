const Chat = require('../models/ChatModel')
const User = require('../models/UserModel');
const accessChat = async (req, res) => {
    const {userId,chatName} =  req.body
    console.log(userId)
    if(!userId) {
        console.log('UserId Param does not send with request');
        return res.sendStatus(400)
    }
    var isChat = await Chat.find({
        isGroupChat : false,
        $and : [
            {users: {$elemMatch:{$eq:req.user.id}}},
            {users: {$elemMatch:{$eq:userId}}},
        ]
    }).populate("users","-password").populate("latestMessage")
    isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select :"name pic email"
    })
    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        var chatData = {
            chatName:chatName,
            isGroupChat : false,
            users : [req.user._id,userId]
        }
        try{
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({_id : createdChat._id}).populate("users","-password")
            res.json({success:"ok",fullChat:fullChat})
        }catch(error){
            console.log(error )
        }
    }
}
const fetchChats = async (req, res)=>{
    try{
        Chat.find({users:{$elemMatch : {$eq :req.user.id}}})
        .populate("users","-password")
        .populate("latestMessage")
        .populate("groupAdmin")
        .sort({updatedAt:-1})
        .then(async (result)=>{
            result = await User.populate(result,{
                path : "latestMessage.sender",
                select:"name pic email"
            })
            res.send(result);
        })
    }catch(error){console.log(error)}
}
const createGroupChat = async (req,res) => {
        if (!req.body.users || !req.body.name) {
          return res.status(400).send({ message: "Please Fill all the feilds" });
        }
      
        var users = JSON.parse(req.body.users);
        if (users.length < 2) {
          return res
            .status(400)
            .send("More than 2 users are required to form a group chat");
        }
        users.push(req.user);
        try {
          const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
          });
      
          const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
          res.status(200).json(fullGroupChat);
        } catch (error) {
          res.status(400);
          throw new Error(error.message);
        }
}
const renameGroup = async (req, res) => {
    const {chatId,chatName} = req.body;
    console.log(chatId, chatName);
    const ChatRename = await Chat.findByIdAndUpdate(chatId, {chatName: chatName} ,{new:true}).populate("users","-password").populate("groupAdmin", "-password");
    if(!ChatRename){
        res.status(400);
        throw new Error(error.message);
    }
    res.status(200).json(ChatRename);
}
const addGroup= async (req, res)=>{
    const {chatId,userId}= req.body
    const added = await Chat.findByIdAndUpdate(chatId, {$push : {users : userId}}).populate("users","-password").populate("groupAdmin", "-password");
    if(!added){
        res.status(400);
        // throw new Error(error.message);
    }
    res.status(200).json(added);
}
const removeGroup = async (req, res)=>{
    const {chatId,userId}= req.body
    const remove = await Chat.findByIdAndRemove(chatId,{$pull : {users : userId}}).populate("users","-password").populate("groupAdmin", "-password");
    if(!remove){
        res.status(400);
        // throw new Error(error.message);
        // if(error){
        // console.log(error)
        // }
    }
    res.status(200).json(remove);
}
module.exports = { accessChat,fetchChats,createGroupChat,renameGroup,addGroup,removeGroup};