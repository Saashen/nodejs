const express = require('express');
const userRouter = express.Router();

const { isAuth } = require('../../validation/tokenValidation');
const { currentUser } = require('../../controllers/users');

userRouter.get('/current', isAuth, currentUser);

module.exports = userRouter;
