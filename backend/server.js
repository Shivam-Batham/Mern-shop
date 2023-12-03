const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./DB/database.js");
// .env config
dotenv.config({path:"./backend/config/config.env"});
const PORT = process.env.PORT || 8000;

connectDB();// DB Connection

app.listen(PORT,(req,res)=>{
    console.log(`server started at ${PORT}...`);
})