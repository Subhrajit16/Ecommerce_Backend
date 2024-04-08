const express = require('express');
const userRouter = express.Router();
const verifyToken = require('../middleware/VERIFY_JWT.js');
const {register, loginUser, getUserProfile } = require('../Controllers/User.controller');

userRouter.post('/signup', register);
userRouter.post('/login', loginUser);
userRouter.get('/profile',verifyToken, getUserProfile);

module.exports = userRouter;
