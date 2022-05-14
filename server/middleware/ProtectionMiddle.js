const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const protectServer = async (req, res, next) => {
    let token;
    if(req.headers.authorization || req.headers.authorization.startsWith("Bearer ")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            console.log("Token",token)
            const Decodedinfo = jwt.decode(token,process.env.private_key);
            // console.log("Decoded Info",Decodedinfo)
            // console.log('decode',Decodedinfo.id)
            req.user = await User.findById(Decodedinfo.id);
            console.log('req user',req.user)
            next();
        }catch(error){
            console.error(error);
        }
    }
    if(!token){
        console.log("No token insulted & No authorization")
    }
}
module.exports = protectServer