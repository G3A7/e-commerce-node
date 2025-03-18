const CategoryModel = require("../models/categoryModel");
const slugify = require('slugify');
const CatchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');
const ApiFeatures = require("../utils/apiFeatures");

// @desc Get List of categories
// @route Get /api/v1/categories
// @access Public
const getCategories = CatchAsync(async(req, res) => {
  // const limit = +req.query.limit||5;
  // const Page = +req.query.page||1;  
  // const Skip = (Page-1)*limit;

  // const categories = await CategoryModel.find({}).skip(Skip).limit(limit); 
  const countDoc = await CategoryModel.countDocuments();
  let apiFeatures = new ApiFeatures(CategoryModel.find({}), req.query)
  .Pagination(countDoc)
  .Filter()
  .Sort()
  .LimitFields()
  .Search(CategoryModel);
  const paginationResult = apiFeatures.paginationResult;

const categories = await apiFeatures.queryMongoose; // Execute query
  res.status(200).json({status:'success',results:categories.length,paginationResult,data:{categories}});

});

// @desc Get specific Category By Id
// @route Get /api/v1/categories/id
// @access public
const getCategory=CatchAsync(async (req, res,next) => {
const ID= req.params.id;
  const category = await CategoryModel.findById(ID);
if(!category){
 return next(new AppError(`NO Category For id ${ID}`,404));
}
res.status(200).json({status:'success',data:{category}});
});

// @desc create a category
// @route Post /api/v1/categories
// @access Private
const createCategory =CatchAsync(async (req, res) => {
  const name = req.body.name;
  const category=await CategoryModel.create({name:name,slug:slugify(name)});
  res.status(200).json({data: category});
});

// @desc Update a category
// @route Update /api/v1/categories
// @access Private
const updateCategory =CatchAsync(async (req,res,next)=>{
  const {id} = req.params;
  const {name} = req.body;

  const category = await CategoryModel.findByIdAndUpdate(id,{...req.body,slug:slugify(name)},{new:true}); 

  // const category = await CategoryModel.findOneAndUpdate({_id:id},{name,slug:slugify(name)},{new:true});
  if(!category){
 return next(new AppError(`NO Category For id ${id}`,404));
}
   res.status(200).json({status:'success',data:{category}});

});


// @desc Delete a category
// @route Delete /api/v1/categories
// @access Private
const deleteCategory = CatchAsync(async(req,res,next)=>{

  const id= req.params.id;
  const category=await CategoryModel.findByIdAndDelete(id);
  if(!category){
    return next(new AppError(`NO Category For id ${id}`,404));
   }
   res.status(204).json({status:'success',data:{category}});
});




module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
};
