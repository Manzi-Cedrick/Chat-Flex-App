const mongoose = require('mongoose');
 
const connection = async () =>{
    try{
        await mongoose.connect(process.env.db_connect_mongo,()=>{
            console.log('Database Successfully connected'.yellow.bold)
        });
    }catch(error){
        console.log('Database Failure: ' + error.message)
    }
}
module.exports = connection;