const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../helpers/mailGeneration');
const getName = require('../helpers/nameFromEmail');
require('dotenv').config();

const { resizeImage, renameImage } = require('../helpers/workWithImage');
const { users } = require('../models');

const registration = async (req, res, next) => {
  try {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();
    const name = getName(email);
    const verificationToken = uuidv4();

    const user = await users.findByEmail(email);
    if (user) {
      return res.status(409).send({
        message: 'Email in use',
      });
    }

    const pathImage = req.file && Date.now() + '-' + req.file.originalname;
    const avatarURL =
      pathImage &&
      `http://localhost:${process.env.PORT || 3000}/images/${pathImage}`;

    if (req.file) {
      const pathFile = req.file.path;
      await resizeImage(pathFile);
      await renameImage(pathFile, pathImage);
    }

    sendEmail(verificationToken, email, name);

    const newUser = await users.createUser({
      email,
      password,
      avatarURL,
      verificationToken,
    });

    return res.status(201).send({
      user: {
        email: newUser.email,
        subscription: 'free',
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  const user = await users.findByEmail(email);

  if (!user || !user.validPassport(password)) {
    return res.status(401).send({ message: 'Email or password is wrong.' });
  }

  if (user && user.verificationToken) {
    return res
      .status(401)
      .send({ message: 'Please check your email and complete verification.' });
  }

  try {
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.SECRET_WORD, {
      expiresIn: '1h',
    });

    await user.updateOne({ token });
    return res.status(200).send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = await users.findById(req.user);
    await user.updateOne({ token: null });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await users.findByVerToken(verificationToken);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  await user.updateOne({ verificationToken: null });
  return res.status(200).send({ message: 'Verification completed.' });
};

module.exports = { registration, login, logout, verify };
