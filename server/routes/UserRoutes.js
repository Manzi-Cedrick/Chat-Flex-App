const express = require('express');
const router = express.Router()
const {register}= require('../controllers/userController');
const {Login}= require('../controllers/userController');
const {AllUsers}= require('../controllers/userController');
const protectServer = require('../middleware/ProtectionMiddle');
router.post('/signup',register);
router.post('/login',Login)
router.get('/search',protectServer,AllUsers)
module.exports = router