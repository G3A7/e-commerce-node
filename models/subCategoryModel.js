const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
name:{
    type:String,
    trim:true,
    unique:[true,"SubCategory Must be unique"],
    minlength:[2,"SubCategory must be at least 3"],
    maxlength:[32,"SubCategory must be less than 32"],
},
slug:{
    type:String,
    lowercase:true,
},
category:{
     type:mongoose.Schema.ObjectId,
     ref:"Category", // model
     required:[true,'SubCategory must be belong to Parent Category'],
}
},{timestamps:true})


module.exports = mongoose.model('SubCategory',subCategorySchema);