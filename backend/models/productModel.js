const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please Enter Product Name"],
  },
  description: {
    type: String,
    require: [true, "please Enter description"],
  },
  price: {
    type: Number,
    require: [true, "please Enter price"],
    maxLength: [8, "price cannot exceed 8 charecters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {type: String, require: true },
      url :{type: String, require: true },
    }
  ],
  category:{
    type :String,
    require : [true,"please Enter Product category"]
  },
  Stock : {
    type:Number,
    require : [true,"please Enter Product stock"],
    maxLength: [4, "price cannot exceed 4 charecters"],
    default:1
  },
  numOfReviews : {
    type :Number,
    default : 0
  },
  reviews :[
    {
        name:{type :String, require:true},
        rating : {type:Number, required : true},
        comment : {type :String,require:true}
    }
  ],
  createdAt : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model("Product", productSchema);
