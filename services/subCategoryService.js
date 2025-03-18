const slugify = require("slugify");
const CathAsync = require("express-async-handler");
const AppError = require("../utils/AppError");
const SubCategory = require("../models/subCategoryModel");
const ApiFeatures = require("../utils/apiFeatures");

// @desc Get List of Subcategories
// @route Get /api/v1/subCategories
// @access Public
const getSubCategories = CathAsync(async (req, res) => {
  // const limit = +req.query.limit || 5;
  // const Page = +req.query.page || 1;
  // const Skip = (Page - 1) * limit;
  // // console.log(req.params.categoryId);
 let filterObj ={};
  if(req.params.categoryId) filterObj={ category: req.params.categoryId };
//   const subcategories = await SubCategory.find(filterObj).skip(Skip).limit(limit);
//   // .populate({ path: "category", select: "name -_id" });
  
  const countDoc = await SubCategory.countDocuments();
let apiFeatures = new ApiFeatures(SubCategory.find(filterObj), req.query)
.Pagination(countDoc)
.Filter()
.Sort()
.LimitFields()
.Search(SubCategory);
const paginationResult = apiFeatures.paginationResult;

const subcategories = await apiFeatures.queryMongoose; // Execute query

res
  .status(200)
  .json({ status: "success", results: subcategories.length, paginationResult, data: { subcategories } });
});

// @desc Get specific SubCategory By Id
// @route Get /api/v1/subCategories/id
// @access public
const getSubCategory = CathAsync(async (req, res, next) => {
  const ID = req.params.id;

  
  const subcategory = await SubCategory.findById(ID).populate({
    path: "category",
    select: "name -_id",
  });
  if (!subcategory) {
    return next(new AppError(`NO SubCategory For id ${ID}`, 404));
  }
  res.status(200).json({ status: "success", data: { subcategory } });
});

// middleWare set Id In req.body.category 
const setIdToBody = (req,res,next)=>{
  if(!req.body.category) req.body.category=req.params.categoryId;
  next();
}

// @desc create a Subcategory
// @route Post /api/v1/subcategories
// @access Private
const createSubCategory = CathAsync(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({ name: name, slug: slugify(name), category });
  res.status(200).json({ data: subCategory });
});


// @desc Update a subCategory
// @route Update /api/v1/subCategories
// @access Private
const updateSubCategory = CathAsync(async (req, res, next) => {
  const { id } = req.params;
  // if(!req.params.categoryId) req.body.category = req.params.categoryId;
  const { name, category } = req.body;

  const subcategory = await SubCategory.findByIdAndUpdate(
    id,
    { ...req.body, slug: slugify(name) },
    { new: true }
  );

  // const category = await CategoryModel.findOneAndUpdate({_id:id},{name,slug:slugify(name)},{new:true});
  if (!subcategory) {
    return next(new AppError(`NO SubCategory For id ${id}`, 404));
  }
  res.status(200).json({ status: "success", data: { subcategory } });
});

// @desc Delete a subCategory
// @route Delete /api/v1/subCategories
// @access Private
const deleteSubCategory = CathAsync(async (req, res, next) => {
  const id = req.params.id;
  const subcategory = await SubCategory.findByIdAndDelete(id);
  if (!subcategory) {
    return next(new AppError(`NO Category For id ${id}`, 404));
  }
  res.status(204).json({ status: "success", data: { subcategory } });
});

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
  setIdToBody
};
