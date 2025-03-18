const { check } = require("express-validator");
const validatorMiddleware = require("../../middleWare/validatorMiddleWare");

const getBrandValidator = [
  // 1- Rules
  check("id").isMongoId().withMessage("Invalid Brand Id Format"),
  validatorMiddleware,
];

const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand Required")
    .isLength({ min: 3 })
    .withMessage("Brand Minlength 3")
    .isLength({ max: 32 })
    .withMessage("Brand Maxlength 32"),
  validatorMiddleware,
];

const updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id Format"),
  validatorMiddleware,
];

const deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id Format"),
  validatorMiddleware,
];

module.exports ={
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator
}
