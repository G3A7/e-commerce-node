const { check } = require("express-validator");
const middlewareValidator = require("../../middleWare/validatorMiddleWare");
const Category = require("../../models/categoryModel");
const SubCategory = require('../../models/subCategoryModel'); 
const createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("product required")
    .isLength({ min: 3 })
    .withMessage("must be at least 3 characters"),
  check("description")
    .notEmpty()
    .withMessage("description required")
    .isLength({ max: 2000 })
    .withMessage("must be at least 2000 characters"),
  check("quantity").notEmpty().withMessage("required").isNumeric().withMessage("must be Number"),
  check("sold").optional().isNumeric().withMessage("must be Number"),
  check("price")
    .notEmpty()
    .withMessage("required")
    .isNumeric()
    .withMessage("must be Number")
    .isLength({ max: 32 })
    .withMessage("must be lower 32"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("product PriceAfterDiscount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (value >= req.body.price)
        throw new Error("priceAfterDiscount after discount must be lower price");
      return true;
    }),
  check("color").optional().isArray().withMessage("should be a array string"),
  check("imageCover").notEmpty().withMessage("required"),
  check("images").optional().isArray().withMessage("should be array"),
  check("category")
    .notEmpty()
    .withMessage("required")
    .isMongoId()
    .withMessage("In valid Id Category").custom((val)=>{return Category.findById(val).then((ans)=>{
      if(!ans){
        return Promise.reject(new Error("No Id Category In DB")); 
      }
    }) }),
  check("subcategory").optional().isMongoId().withMessage("invalid id Sub category").custom((arrId)=>{return SubCategory.find({_id:{$exists:true,$in:arrId}}).then((ans)=>{
    if(ans.length != arrId.length){
      return Promise.reject(new Error("No Id Sub Category In DB"));
    }
  }) 
}).custom(async (arrId,{req})=>{
       const subCategories  = await  SubCategory.find({category:req.body.category});
       let ids = [];
       subCategories.forEach((e)=>{
        ids.push(e._id.toString());
       });
         let checker =arrId.every((e)=> ids.includes(e))
              
         if(!checker){
          return Promise.reject(new Error('No Id Sub Category In DB For Category'))
         }
        }),
  check("brand").optional().isMongoId().withMessage("invalid id"),
  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("number")
    .isLength({ min: 1, max: 5 })
    .withMessage("between 1 5"),
  check("ratingQuantity").optional().isNumeric().withMessage("number"),
  middlewareValidator,
];

const getProductValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  middlewareValidator,
];

const updateProductValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  middlewareValidator,
];

const deleteProductValidator = [
  check("id").isMongoId().withMessage("invalid id"),
  middlewareValidator,
];

module.exports = {
  createProductValidator,
  deleteProductValidator,
  getProductValidator,
  updateProductValidator,
};
