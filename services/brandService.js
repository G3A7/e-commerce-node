const Brand = require("../models/brandModel");
const slugify = require('slugify');
const CatchAsync = require('express-async-handler');
const AppError = require('../utils/AppError');
const ApiFeatures = require("../utils/apiFeatures");
// @desc Get List of Brands
// @route Get /api/v1/Brands
// @access Public
const getBrands = CatchAsync(async(req, res) => {
  // const limit = +req.query.limit||5;
  // const Page = +req.query.page||1;  
  // const Skip = (Page-1)*limit;

  // const brands = await Brand.find({}).skip(Skip).limit(limit); 

  const countDoc = await Brand.countDocuments();
  let apiFeatures = new ApiFeatures(Brand.find({}), req.query)
    .Pagination(countDoc)
    .Filter()
    .Sort()
    .LimitFields()
    .Search(Brand);
    const paginationResult = apiFeatures.paginationResult;

  const brands = await apiFeatures.queryMongoose; // Execute query

  res.status(200).json({status:'success',results:brands.length,paginationResult,data:{brands}});

});

// @desc Get specific Brand By Id
// @route Get /api/v1/brands/id
// @access public
const getBrand=CatchAsync(async (req, res,next) => {
const ID= req.params.id;
  const brands = await Brand.findById(ID);
if(!brands){
 return next(new AppError(`NO brands For id ${ID}`,404));
}
res.status(200).json({status:'success',data:{brands}});
});

// @desc create a brands
// @route Post /api/v1/brands
// @access Private
const createBrand =CatchAsync(async (req, res) => {
  const name = req.body.name;
  const brands=await Brand.create({name:name,slug:slugify(name)});
  res.status(200).json({data: brands});
});

// @desc Update a brands
// @route Update /api/v1/brands
// @access Private
const updateBrand =CatchAsync(async (req,res,next)=>{
  const {id} = req.params;
  const {name} = req.body;

  const brands = await Brand.findByIdAndUpdate(id,{...req.body,slug:slugify(name)},{new:true}); 

  // const category = await CategoryModel.findOneAndUpdate({_id:id},{name,slug:slugify(name)},{new:true});
  if(!brands){
 return next(new AppError(`NO brands For id ${id}`,404));
}
   res.status(200).json({status:'success',data:{brands}});

});


// @desc Delete a brands
// @route Delete /api/v1/brands
// @access Private
const deleteBrand = CatchAsync(async(req,res,next)=>{

  const id= req.params.id;
  const brands=await Brand.findByIdAndDelete(id);
  if(!category){
    return next(new AppError(`NO brands For id ${id}`,404));
   }
   res.status(204).json({status:'success',data:{brands}});
});




module.exports = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand
};
