const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const authService = require('../services/authService');
const userValidator = require('../utils/validators/userValidator');
router.route('/').get(userService.getUsers).post(userValidator.createUSer,userService.createUser);
router.route('/changepassword/:id').put(userValidator.changePasswordValidator,userService.changeUserPassword);
router.route('/:id').put(userValidator.updateUserValidator,userService.updateUser);
router.route('/signup').post(userValidator.signupValidator,authService.signup);
router.route('/login').post(userValidator.loginValidator,authService.login);

module.exports = router;