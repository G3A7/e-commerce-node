const { check } = require("express-validator");
const validatorMiddleware = require("../../middleWare/validatorMiddleWare");

const getCategoryValidator = [
  // 1- Rules
  check("id").isMongoId().withMessage("Invalid Category Id Format"),
  validatorMiddleware,
];

const createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category Required")
    .isLength({ min: 3 })
    .withMessage("Category Minlength 3")
    .isLength({ max: 32 })
    .withMessage("Category Maxlength 32"),
  validatorMiddleware,
];

const updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id Format"),
  validatorMiddleware,
];

const deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id Format"),
  validatorMiddleware,
];

module.exports ={
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
}
