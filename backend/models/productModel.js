const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Product Name"],
  },
  description: {
    type: String,
    required: [true, "please Enter description"],
  },
  price: {
    type: Number,
    required: [true, "please Enter price"],
    maxLength: [8, "price cannot exceed 8 charecters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {type: String, required: true },
      url :{type: String, required: true },
    }
  ],
  category:{
    type :String,
    required : [true,"please Enter Product category"]
  },
  Stock : {
    type:Number,
    required : [true,"please Enter Product stock"],
    maxLength: [4, "price cannot exceed 4 charecters"],
    default:1
  },
  numOfReviews : {
    type :Number,
    default : 0
  },
  reviews :[
    {
        name:{type :String, required:true},
        rating : {type:Number, required : true},
        comment : {type :String,required:true}
    }
  ],
  createdAt : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
