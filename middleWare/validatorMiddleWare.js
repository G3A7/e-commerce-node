// 2- MiddleWare ==> catch Error from rules if exist   
const { validationResult} = require("express-validator");
const validatorMiddleware =(req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ name:"Ahmed",errors: errors.array() });
    }
    next();
}

module.exports = validatorMiddleware;