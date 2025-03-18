const express = require("express");
const BrandService = require("../services/brandService");
const validatorMiddleWare=require('../utils/validators/brandValidator')
const router = express.Router();




router.route("/").get(BrandService.getBrands).post(validatorMiddleWare.createBrandValidator,BrandService.createBrand);
router
  .route("/:id")
  .get(validatorMiddleWare.getBrandValidator,BrandService.getBrand)
  .put(validatorMiddleWare.updateBrandValidator,validatorMiddleWare.createBrandValidator,BrandService.updateBrand)
  .delete(validatorMiddleWare.deleteBrandValidator,BrandService.deleteBrand);
module.exports = router;
