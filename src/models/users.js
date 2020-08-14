const User = require('./schemas/user');

const findById = id => User.findOne({ _id: id });

const findByEmail = email => User.findOne({ email });

const createUser = ({ email, password }) => {
  const user = new User({ email, password });
  return user.save();
};

const updateUserSubscription = ({ id, newValue }) =>
  User.findByIdAndUpdate(
    id,
    { $set: { subscription: newValue } },
    { returnOriginal: false, upsert: false },
  );

module.exports = { findById, findByEmail, createUser, updateUserSubscription };
