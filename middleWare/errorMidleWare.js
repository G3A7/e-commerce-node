const AppError = require("../utils/AppError");

const sendErrorForDev = (err, res) => {
  res
    .status(err.statusCode)
    .json({ status: err.status, err, message: err.message, stack: err.stack });
};

const sendErrorForProd = (err, res) => {
  res.status(err.statusCode).json({ status: err.status, message: err.message });
};

const handleError =()=>{
    return new AppError("Invalid Token Man You Are Ready ",400);
}

const handleErrorExpire =()=>{
    return new AppError("Please Agin login ",400);
}

const globalMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "production") {
     if(err.name == "JsonWebTokenError"){
        err=handleError(err);
     } 
     if(err.name == "TokenExpiredError"){
        err=handleErrorExpire(err);
     } 
    sendErrorForProd(err, res);
  } else if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  }
};

module.exports = globalMiddleware;
