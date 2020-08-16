const jwt = require('jsonwebtoken');
const { resizeImage, renameImage } = require('../helpers/workWithImage');
const { users } = require('../models');
require('dotenv').config();

const registration = async (req, res, next) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  const user = await users.findByEmail(email);
  if (user) {
    return res.status(409).send({
      message: 'Email in use',
    });
  }

  try {
    const pathImage = req.file && Date.now() + '-' + req.file.originalname;

    const avatarURL =
      pathImage &&
      `http://localhost:${process.env.PORT || 3000}/images/${pathImage}`;

    if (req.file) {
      const pathFile = req.file.path;
      await resizeImage(pathFile);
      await renameImage(pathFile, pathImage);
    }

    const newUser = await users.createUser({ email, password, avatarURL });

    res.status(201).send({
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
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { registration, login, logout };