const User = require('./schemas/user');

const findById = async id => User.findOne({ _id: id });

const findByEmail = async email => User.findOne({ email });

const createUser = async ({ email, password }) => {
  const user = new User({ email, password });
  return user.save();
};

module.exports = { findById, findByEmail, createUser };
