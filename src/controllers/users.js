const jwt = require('jsonwebtoken');
const { users } = require('../models');
require('dotenv').config();

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await users.findByEmail(email);

  user &&
    res.status(409).send({
      message: 'Email in use',
    });

  try {
    const newUser = await users.createUser({ email, password });
    res.status(201).send({
      user: {
        email: newUser.email,
        subscription: 'free',
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await users.findByEmail(email);

  if (!user || !user.validPassport(password)) {
    res.status(401).send({ message: 'Email or password is wrong.' });
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.SECRET_WORD, { expiresIn: '1h' });
  await user.update({ token });
  return res.status(200).send({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
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

const currentUser = async (req, res, next) => {
  try {
    const user = await users.findById(req.user);
    res.status(200).send({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registration, login, logout, currentUser };
