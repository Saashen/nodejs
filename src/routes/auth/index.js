const express = require('express');
const authRouter = express.Router();

const { registration, login, logout, verify } = require('../../controllers/auth');
const { validateUser } = require('../../validation/authValidation');
const { upload } = require('../../helpers/multer');
const { isAuth } = require('../../validation/tokenValidation');

authRouter.post(
  '/register',
  upload.single('avatar'),
  validateUser,
  registration,
);
authRouter.post('/login', validateUser, login);
authRouter.post('/logout', isAuth, logout);
authRouter.get('/verify/:verificationToken', verify);

module.exports = authRouter;
