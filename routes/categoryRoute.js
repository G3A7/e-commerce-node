const express = require("express");
const categoryService = require("../services/categoryService");
const validatorMiddleWare=require('../utils/validators/categoryValidator')
const subCategoryRoute = require('../routes/subCategoryRoute');
const router = express.Router();
const protectMiddleWare = require('../services/authService'); 


router.use('/:categoryId/subcategories',subCategoryRoute);
router.route("/").get(categoryService.getCategories).post(protectMiddleWare.ProtectUrL,validatorMiddleWare.createCategoryValidator,categoryService.createCategory);
router
  .route("/:id")
  .get(validatorMiddleWare.getCategoryValidator,categoryService.getCategory)
  .put(validatorMiddleWare.updateCategoryValidator,validatorMiddleWare.createCategoryValidator,categoryService.updateCategory)
  .delete(validatorMiddleWare.deleteCategoryValidator,categoryService.deleteCategory);
module.exports = router;
