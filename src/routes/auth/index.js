const express = require('express');
const authRouter = express.Router();

const { registration, login, logout } = require('../../controllers/auth');
const { validateUser } = require('../../validation/authValidation');
const { isAuth } = require('../../validation/tokenValidation');

authRouter.post('/register', validateUser, registration);
authRouter.post('/login', validateUser, login);
authRouter.post('/logout', isAuth, logout);

module.exports = authRouter;
