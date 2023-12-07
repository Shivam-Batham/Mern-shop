const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken");
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

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

// jwt token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({
        id: this._id
    },process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE
    })
}
// compare password
userSchema.methods.comparePassword = async function(storedPassword){
    return await bcrypt.compare(storedPassword,this.password);
}
module.exports = mongoose.model("User",userSchema); 