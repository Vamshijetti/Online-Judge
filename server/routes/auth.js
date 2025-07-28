const express = require('express');
const router = express.Router();
const loginRoute = require('../controllers/loginApi');
const registerRoute = require('../controllers/registerApi')
const forgetPasswordRoute = require('../controllers/forgotPasswordApi')

// Use the login route defined in loginApi.js
router.use('/', loginRoute);
router.use('/',registerRoute);
router.use('/',forgetPasswordRoute)
module.exports = router;

// http://localhost:4000/login