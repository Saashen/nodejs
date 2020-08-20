const User = require('./schemas/user');

const findById = id => User.findOne({ _id: id });

const findByEmail = email => User.findOne({ email });

const findByVerToken = verificationToken => User.findOne({ verificationToken });

const createUser = ({
  email,
  password,
  avatarURL = null,
  verificationToken,
}) => {
  const user = new User({ email, password, avatarURL, verificationToken });
  return user.save();
};

const updateUserSubscription = ({ id, newValue }) =>
  User.findByIdAndUpdate(
    id,
    { $set: { subscription: newValue } },
    { returnOriginal: false, upsert: false },
  );

const updateUserImage = ({ id, avatarURL }) =>
  User.findByIdAndUpdate(
    id,
    { $set: { avatarURL } },
    { returnOriginal: false, upsert: false },
  );

module.exports = {
  findById,
  findByEmail,
  findByVerToken,
  createUser,
  updateUserSubscription,
  updateUserImage,
};
