const express = require('express');
const userRouter = express.Router();

const { isAuth } = require('../../validation/tokenValidation');
const {
  firstUserSubscriptionValidate,
  secondUserSubscriptionValidate,
} = require('../../validation/usersValidation');
const {
  currentUser,
  updateUser,
  updateAvatar,
} = require('../../controllers/users');
const { isImage } = require('../../validation/imageValidation');
const { upload } = require('../../helpers/multer');

userRouter
  .get('/current', isAuth, currentUser)
  .patch(
    '/',
    isAuth,
    firstUserSubscriptionValidate,
    secondUserSubscriptionValidate,
    updateUser,
  )
  .patch('/avatars', isAuth, upload.single('avatar'), isImage, updateAvatar);

module.exports = userRouter;
