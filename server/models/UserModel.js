const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name:{type : String , required : true},
    email :{type: String , required : true ,unique:true},
    password:{type : String , required :true},
    pic:{type : String , required : true , default : 'https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg'}
})
// module.exports.User = mongoose.model('User',UserSchema);
const User = mongoose.model('User',UserSchema)
module.exports= User