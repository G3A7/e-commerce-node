const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const CathAsync = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const signup = CathAsync(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    slug: req.body.slug,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign(
    { id: user._id },
    "9a26668371c9d482219410648548aabdd8d8217b92bef7167eb9dd563283f2bc",
    {
      expiresIn: "90d",
    }
  );
  res.status(201).json({ data: { user }, token });
});

const login = CathAsync(async (req, res, next) => {
  // 1)
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new AppError("wrong password or Email", 400));
  }
  // 2)
  const token = jwt.sign(
    { id: user._id },
    "9a26668371c9d482219410648548aabdd8d8217b92bef7167eb9dd563283f2bc",
    {
      expiresIn: "90d",
    }
  );
  // 3)
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

const ProtectUrL = CathAsync(async(req,res,next)=>{
// 1) check Token
// console.log(req.headers.authorization)
let  token;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
 token = req.headers.authorization.split(" ")[1];
}
if(!token){
  console.log(token);
  return next(new AppError("Invalid token",400));
}
// 2) verify Token
    const decoded = jwt.verify(token,"9a26668371c9d482219410648548aabdd8d8217b92bef7167eb9dd563283f2bc")
    /*
    {
    id:...,
    iat:createdAt,
    exp:...
    }
    */

// 3) check if User Exists
 const checkUser = await User.findById(decoded.id);
 if(!checkUser){
  return next(new AppError("user Not Exists",401));
 }
//4) check user  Change Password
 if(checkUser.changePasswordTime){
  const timeChanged = parseInt(checkUser.changePasswordTime.getTime()/1000,10);
  console.log(timeChanged);
  if(timeChanged > decoded.iat){
    return next(new AppError("Please LoginAgain ",401));
  }
}
req.user= checkUser;
next();
});


module.exports = {
  signup,
  login,
  ProtectUrL
};
