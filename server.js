const express = require("express");
const morgan = require("morgan");

const mongoose = require("mongoose");
const CategoryService = require("./services/categoryService");
const globalMiddleware = require('./middleWare/errorMidleWare');
const AppError = require("./utils/AppError");
require("dotenv").config({path:''});
// connect DB 😎
const dbConnection = require("./config/database");
dbConnection();
// Routes
const CategoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandsRoute = require('./routes/brandRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
// express App
const app = express();
// middleware🤞
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`node : ${process.env.NODE_ENV}`);
}

app.use(express.json());

//Mount Route
app.use("/api/v1/categories", CategoryRoute);
app.use('/api/v1/subcategories',subCategoryRoute);
app.use('/api/v1/brands',brandsRoute);
app.use('/api/v1/products',productRoute);
app.use('/api/v1/users',userRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Invalid URI ${req.originalUrl}`, 404));
});

// Error Handler Middleware
app.use(globalMiddleware);

const server = app.listen(process.env.PORT || 4000, () => {
  console.log(`server run on port ${process.env.PORT}`);
});

//@desc  Handel rejections Out Side Express
process.on('unhandledRejection',(err)=>{
  console.log(err.name , err.message);
  server.close(()=>{
    console.log(`Shutting Down .....`);
    process.exit(1);
  });
});


