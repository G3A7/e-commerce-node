const express = require("express");
const productService = require("../services/productService");
const validatorMiddleWare=require('../utils/validators/productValidator');
const router = express.Router();



router.route("/").get(productService.getProducts).post(validatorMiddleWare.createProductValidator,productService.createProduct);
router
  .route("/:id")
  .get(validatorMiddleWare.getProductValidator,productService.getProduct)
  .put(validatorMiddleWare.updateProductValidator,productService.updateProduct)
  .delete(validatorMiddleWare.deleteProductValidator,productService.deleteProduct);
module.exports = router;
