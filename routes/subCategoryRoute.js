const express = require("express");
const SubCategoryServices = require("../services/subCategoryService");
const validatorSubCategory = require("../utils/validators/subCategoryValidator");
const router = express.Router({mergeParams:true});

router
  .route("/")
  .post(SubCategoryServices.setIdToBody,validatorSubCategory.createSubCategoryValidator, SubCategoryServices.createSubCategory)
  .get(SubCategoryServices.getSubCategories);

router
  .route("/:id")
  .get(validatorSubCategory.getSubCategoryValidator, SubCategoryServices.getSubCategory)
  .delete(validatorSubCategory.deleteSubCategoryValidator, SubCategoryServices.deleteSubCategory)
  .put(SubCategoryServices.setIdToBody,validatorSubCategory.createSubCategoryValidator,validatorSubCategory.updateSubCategoryValidator, SubCategoryServices.updateSubCategory);

module.exports = router;
