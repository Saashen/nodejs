const User = require('./schemas/user');

const findById = async id => User.findOne({ _id: id });

const findByEmail = async email => User.findOne({ email });

const createUser = async ({ email, password }) => {
  const user = new User({ email, password });
  return user.save();
};

const updateUserSubscription = async ({ id, newValue }) =>
  User.findByIdAndUpdate(
    id,
    { $set: { subscription: newValue } },
    { returnOriginal: false, upsert: false },
  );

module.exports = { findById, findByEmail, createUser, updateUserSubscription };
