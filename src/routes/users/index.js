const express = require('express');
const userRouter = express.Router();

const { isAuth } = require('../../validation/tokenValidation');
const {
  firstUserSubscriptionValidate,
  secondUserSubscriptionValidate,
} = require('../../validation/usersValidation');
const { currentUser, updateUser } = require('../../controllers/users');

userRouter
  .get('/current', isAuth, currentUser)
  .patch(
    '/',
    isAuth,
    firstUserSubscriptionValidate,
    secondUserSubscriptionValidate,
    updateUser,
  );

module.exports = userRouter;
