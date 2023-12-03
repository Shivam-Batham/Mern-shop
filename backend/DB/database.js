const mongoose =  require("mongoose");
const DB_NAME = require("../constants/constants.js");
const dotenv = require("dotenv");
dotenv.config({path:"./backend/config.env"});

const connectDB = async ()=>{
    try{
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
     
       console.log(`DB_HOST : ${connectionInstance.connection.host}`);
    }catch(error){
        console.log("DB connection failed...\n",error);
        process.exit(1);
    }
 
}

module.exports = connectDB; 