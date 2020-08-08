const { users } = require('../models');

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

module.exports = { currentUser, updateUser };
