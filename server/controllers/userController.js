const lodash = require('lodash');
const User = require('../models/UserModel');
const hashpassword = require('../config/hash');
// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
module.exports.register = async (req, res) => {
    try{
    const userExists = await User.findOne({email : req.body.email});
    if(userExists){
        console.log('User already exists');
    }else{
    const user= await new User(lodash.pick(req.body,['name','email','password','pic']));
    let hashedpass=await hashpassword(user.password);
    user.password = hashedpass;
    const finalUser=await user.save()
    console.log(finalUser)
    res.json({success : "ok",user:finalUser});
    }
}catch(error){console.log(error)}
}
module.exports.Login = async (req, res) => {
    try{
    const userExists = await User.findOne({email : req.body.email});
    if(!userExists){
        res.send('User already does not exist');
    }
    // let comparedpass = await bcrypt.compare(req.body.password,userExists.password);
    const token = jwt.sign({id:userExists.id},process.env.private_key)
    res.json({message : "ok", chat_token:token});
    // if(!comparedpass){
        //     console.log(`User Credentials False`)
        // }
        // console.log(token)
   
}catch(error){console.log(error)}
}
module.exports.AllUsers = async (req, res) => {
    console.log('All Users')
    const keyword = req.query.search ? {
        $or :[
            {name:{$regex: req.query.search , $options:"i"}}, 
            {email:{$regex: req.query.search , $options:"i"}}, 
        ]
    } : {};
    const searcheduser= await User.find(keyword)
    res.json(searcheduser);
}