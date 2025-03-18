const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'too short product title'],
        maxlenth:[100,'too long product title']
    },
    slug:{
        type:String,
        lowercase:true,
    },
    description:{
        type:String,
        required:[true,'product description is required'],
        minlength:[20,'too short product description']
    },
    quantity:{
        type:Number,
        required:[true,'product quantity is required'],
    },
    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true,'product price is required'],
        trim:true,
        max:[200000,'too long product price']
    },
    priceAfterDiscount:{
        type:Number
    },
   color:[String],
   imageCover:{
    type:String,
    required:[true,'product image cover is required'],
   },
   images:[String],
  category:{
     type:mongoose.Schema.ObjectId,
     ref:"Category", // model
     required:[true,'product category is required belong'],
  },
  subcategory:[{
    type:mongoose.Schema.ObjectId,
    ref:'SubCategory', //model
  }],
  brand:{
    type:mongoose.Schema.ObjectId,
    ref:'Brand'
  },
  ratingsAverage:{
    type:Number,
    min:[1,'ratting must be above or equal 1'],
    max:[5,'ratings must be below or  equal 5']
  },
  ratingsQuantity:{
    type:Number,
    default:0
  }   

},{timestamps:true})



module.exports = mongoose.model('Product',productSchema);

