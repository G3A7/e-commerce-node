const User = require("../models/userModel");
const CatchAsync = require("express-async-handler");
const apiFeatures = require("../utils/apiFeatures");
const { default: slugify } = require("slugify");
const bcrypt = require("bcryptjs");
const getUsers = CatchAsync(async (req, res) => {
  //   const users = await User.find({});
  const countDocument = await User.countDocuments();
  const queryModelBuild = new apiFeatures(User.find({}), req.query)
    .Pagination(countDocument)
    .Filter()
    .LimitFields()
    .Search("USer")
    .Sort();

  const { paginationResult } = queryModelBuild;
  const users = await queryModelBuild.queryMongoose;

  res
    .status(200)
    .json({ status: "success", result: users.length, paginationResult, data: { users } });
});

const createUser = CatchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(200).json({ status: "success", data: { newUser } });
});

const updateUser = CatchAsync(async (req, res) => {

    const {id} = req.params;
    if(req.body.name){
   req.body.slug = slugify(req.body.name);
}
console.log(req.body);
console.log(req.body.rule);
const newUser= await User.findByIdAndUpdate(id,{
        name: req.body.name,
        slug: req.body.slug,
        email: req.body.email,
        phone: req.body.phone,
        rule: req.body.rule
    },{
        new:true
    });

    res.status(200).json({ status: "success", data: { newUser } });


});


const changeUserPassword = CatchAsync(async (req, res) => {
  const {id} = req.params;
const newUser= await User.findByIdAndUpdate(id,{
     password:await bcrypt.hash(req.body.password,10),
     changePasswordTime:Date.now()
  },{
      new:true
  });

  res.status(200).json({ status: "success", data: { newUser } });

});


module.exports = {
  getUsers,
  createUser,
  updateUser,changeUserPassword
};
