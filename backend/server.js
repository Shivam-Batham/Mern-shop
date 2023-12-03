const app = require("./app");
const dotenv = require("dotenv");

// .env config
dotenv.config({path:"./backend/config.env"});
const PORT = process.env.PORT || 8000;

app.listen(PORT,(req,res)=>{
    console.log(`server started at ${PORT}...`);
})