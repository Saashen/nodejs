const express = require('express');
const authRouter = express.Router();

const { registration, login, logout } = require('../../controllers/auth');
const { validateUser } = require('../../validation/authValidation');
const { upload } = require('../../controllers/multer');
const { isAuth } = require('../../validation/tokenValidation');

authRouter.post(
  '/register',
  //   validateUser,
  upload.single('avatar'),
  registration,
);
authRouter.post('/login', validateUser, login);
authRouter.post('/logout', isAuth, logout);

module.exports = authRouter;
