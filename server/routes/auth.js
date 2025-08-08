const express = require('express');
const router = express.Router();
const loginRoute = require('../controllers/loginApi');
const registerRoute = require('../controllers/registerApi')
const forgetPasswordRoute = require('../controllers/forgotPasswordApi')
const problemsRoute = require('../controllers/problemController')
const submissionsRoute = require('../controllers/submissionController')
const codeRoute = require('../controllers/codeController')

// Use the login route defined in loginApi.js
router.use('/', loginRoute);
router.use('/',registerRoute);
router.use('/',forgetPasswordRoute);
router.use('/problem',problemsRoute);
router.use('/problem',submissionsRoute);
router.use('/',codeRoute);
module.exports = router;

// http://localhost:4000/login