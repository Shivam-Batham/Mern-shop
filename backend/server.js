const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./DB/database.js");
// .env config
dotenv.config({path:"./backend/config/config.env"});
const PORT = process.env.PORT || 8000;
// handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting dawn the server due to unhandledRejection promise rejection`);
    process.exit(1);
})

connectDB();// DB Connection

const server = app.listen(PORT,(req,res)=>{
    console.log(`server started at ${PORT}...`);
})

// unhandled rejection
process.on("unhandledRejection",err =>{
    console.log(`Erro : ${err.message}`)
    console.log(`Shutting dawn the server due to unhandledRejection promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
})