const {check} = require('express-validator');
const validatorMiddleware = require('../../middleWare/validatorMiddleWare');


const createSubCategoryValidator =[
    check("name")
    .notEmpty()
    .withMessage("Category Required")
    .isLength({ min: 2 })
    .withMessage("Category Minlength 2")
    .isLength({ max: 32 })
    .withMessage("Category Maxlength 32"),
    check('category').isMongoId().withMessage('Invalid Category id Format'),
validatorMiddleware
];

const getSubCategoryValidator=[
  check('id').isMongoId().withMessage("Invalid Formated Id"),
  validatorMiddleware
];


const updateSubCategoryValidator=[
    check('id').isMongoId().withMessage("Invalid Formated Id"),
    validatorMiddleware
  ];
  const deleteSubCategoryValidator=[
    check('id').isMongoId().withMessage("Invalid Formated Id"),
    validatorMiddleware
  ];

module.exports = {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator
}

