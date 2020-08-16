const { users } = require('../models');
const { resizeImage, renameImage } = require('../helpers/workWithImage');
require('dotenv').config();

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

const updateUser = async (req, res, next) => {
  try {
    const id = req.user;
    const newValue = req.body.subscription;

    const user = await users.updateUserSubscription({ id, newValue });
    res
      .status(200)
      .send({ email: user.email, subscription: user.subscription });
  } catch (err) {
    next(err);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const id = req.user;
    const pathFile = req.file.path;
    const pathImage = Date.now() + '-' + req.file.originalname;
    const avatarURL = `http://localhost:${
      process.env.PORT || 3000
    }/images/${pathImage}`;

    await resizeImage(pathFile);
    await renameImage(pathFile, pathImage);

    const user = await users.updateUserImage({ id, avatarURL });
    res.status(200).send({
      avatarURL: user.avatarURL,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { currentUser, updateUser, updateAvatar };
