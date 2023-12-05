const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required : [true,"please enter your name"],
        maxlength : [30,"Name can't exceed 30 charecters"],
        minlength : [1,"Name should have atleast 1 charecters"]
    },
    email : {
        type : String,
        required : [true,"please enter your email"],
        unique : true,
        validate :[validator.isEmail,"Please Enter valid email"]
    },
    password:{
        type : String,
        required : [true,"please enter your password"],
        minlength :[8,"password should have atleast 8 charecters"],
        select : false,
    },
    avatar: {
        public_id : {
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type : String,
        default:"user"
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date,

});

module.exports = mongoose.model("User",userSchema);