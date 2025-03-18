const Product = require("../models/productModel");
const slugify = require("slugify");
const CatchAsync = require("express-async-handler");
const AppError = require("../utils/AppError");
const ApiFeatures = require("../utils/apiFeatures");
// @desc Get List of Product
// @route Get /api/v1/products
// @access Public
const getProducts = CatchAsync(async (req, res) => {
  // build query
  const countDoc = await Product.countDocuments();
  let apiFeatures = new ApiFeatures(Product.find({}), req.query)
    .Pagination(countDoc)
    .Filter()
    .Sort()
    .LimitFields()
    .Search(Product);
    const paginationResult = apiFeatures.paginationResult;
  const products = await apiFeatures.queryMongoose; // Execute query

  res.status(200).json({ status: "success", results: products.length ,paginationResult,data: { products } });
});

// @desc Get specific Product By Id
// @route Get /api/v1/products/id
// @access public
const getProduct = CatchAsync(async (req, res, next) => {
  const ID = req.params.id;
  const product = await Product.findById(ID).populate({ path: "category", select: "name -_id" });
  if (!product) {
    return next(new AppError(`NO Product For id ${ID}`, 404));
  }
  res.status(200).json({ status: "success", data: { product } });
});

// @desc create a Product
// @route Post /api/v1/products
// @access Private
const createProduct = CatchAsync(async (req, res) => {
  console.log(req.body);
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(200).json({ data: product });
});

// @desc Update a Product
// @route Update /api/v1/products
// @access Private
const updateProduct = CatchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);

  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

  // const category = await CategoryModel.findOneAndUpdate({_id:id},{name,slug:slugify(name)},{new:true});
  if (!product) {
    return next(new AppError(`NO product For id ${id}`, 404));
  }
  res.status(200).json({ status: "success", data: { product } });
});

// @desc Delete a product
// @route Delete /api/v1/products
// @access Private
const deleteProduct = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    return next(new AppError(`NO product For id ${id}`, 404));
  }
  res.status(204).json({ status: "success", data: { product } });
});

module.exports = {
  deleteProduct,
  updateProduct,
  createProduct,
  getProduct,
  getProducts,
};
