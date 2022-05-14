const Message = require('../models/MessageModel');
const User = require('../models/UserModel');
const Chat = require('../models/ChatModel');


const getAllMessages = async (req,res)=>{
    try{
        const messages = await Message.find({chat : req.params.id})
        .populate('sender','name pic email')
        .populate('chat')
        res.json(messages)
        console.log('Hello')
    }catch(error){
        console.log(error)
    }
}
const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "name pic");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.users",
        select: "name pic email",
      });
  
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
      res.json(message);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };
const groupChating=()=>{
    console.log('hello')
}
module.exports ={sendMessage,getAllMessages}