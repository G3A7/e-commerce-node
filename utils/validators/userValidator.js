const { check } = require("express-validator");
const validatorMiddleware = require("../../middleWare/validatorMiddleWare");
const { default: slugify } = require("slugify");
const User = require("../../models/userModel"); 
const bcrypt =require("bcryptjs");
const createUSer = [
  check("name")
    .notEmpty()
    .withMessage("notEmpty")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email").notEmpty().withMessage("notEmpty").isEmail().withMessage("Not Email Correct").custom(async(val)=>{
         const user = await User.findOne({email:val});
         if(user){
          return Promise.reject(new Error("User exists in ")); 
         } 
         return true;
  }),
  check("passwordConfirm").notEmpty().withMessage("Not Empty"),
  check("password")
    .notEmpty()
    .withMessage("notEmpty")
    .isLength({ min: 6 })
    .withMessage("Min Length 6").custom((val,{req})=>{
        if(val !== req.body.passwordConfirm){
            console.log(val , req.body.confirmPassword);
            return Promise.reject(new Error("Error In Password "));
        }
        return true;
    }),
check('profileImg').optional(),
check('role').optional(),
check('phone').optional().isMobilePhone('ar-EG').withMessage("enter phone number Correct ")
,
  validatorMiddleware,
];

// const updateUser = [
//     check("name")
//     .notEmpty()
//     .withMessage("notEmpty")
//     .custom((val, { req }) => {
//       req.body.slug = slugify(val);
//       return true;
//     }),
//   check("email").notEmpty().withMessage("notEmpty").isEmail().withMessage("Not Email Correct").custom(async(val)=>{
//          const user = await User.findOne({email:val});
//          if(user){
//           return Promise.reject(new Error("User exists in ")); 
//          } 
//          return true;
//   }),
//   check("password")
//     .notEmpty()
//     .withMessage("notEmpty")
//     .isLength({ min: 6 })
//     .withMessage("Min Length 6"),
//   check(""),
// check('profileImg').optional(),
// check('role').optional(),
// check('phone').optional().isMobilePhone('ar-EG').withMessage("enter phone number Correct ")
// ,
//   validatorMiddleware,
// ];

const updateUserValidator=[
    check('id').isMongoId().withMessage("Invalid Formated Id"),
    validatorMiddleware
];
const changePasswordValidator=[
  check('id').isMongoId().withMessage("Invalid Formated Id"),
  check('passwordConfirm').notEmpty().withMessage("Please enter your password"),
  check("currentPassword").notEmpty().withMessage("Please enter your current password")
  ,
  check('password').notEmpty().withMessage("Please enter password").custom(async(val,{req})=>{    
    // password
    const userDb = await User.findById(req.params.id);
    if(!userDb){
      return Promise.reject(new Error("Password Wrong"));
    } 
    const checker = await bcrypt.compare(req.body.currentPassword,userDb.password);
    if(!checker){
      return Promise.reject(new Error("Password Wrong"));
    }
 // password and confirm password  
  if(val != req.body.passwordConfirm){
    return Promise.reject(new Error("Password Wrong"));
  }

  return true;
  })  ,
  validatorMiddleware
];


const signupValidator =[
 check("name").notEmpty().withMessage("Please enter your name").custom((val,{req})=>{
    req.body.slug = slugify(val);
    return true;
 }),
 check('password').notEmpty().withMessage("Please enter your password").isLength({min:6}).withMessage("too Short").custom((val,{req})=>{
             if(val != req.body.passwordConfirm){
              return Promise.reject(new Error("Password Wrong"));
             }
             return true;
 }),
 check('passwordConfirm').notEmpty().withMessage("Please enter your ConfirmPassword"),

 check('email').notEmpty().withMessage("Please enter your email address").isEmail().withMessage("Please enter your email address").custom(async(val)=>{
    const user=await User.findOne({email:val});
    if(user){
      return Promise.reject(new Error("Emil Exists")); 
    }
    return true;
 }),
  validatorMiddleware
];

const loginValidator=[
  check('email').notEmpty().withMessage("Please enter a valid email").isEmail().withMessage("Please enter a valid Email"),
  check('password').notEmpty().withMessage("Please enter password").isLength({min:6}).withMessage("Please enter long password")
  ,
  validatorMiddleware
];

module.exports ={
    createUSer,
    updateUserValidator,
    changePasswordValidator,
    signupValidator,
    loginValidator
}
