const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
    },
    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
    },
    token: {
      type: String,
    },
    verificationToken: {
      type: String,
    },
  },
  { versionKey: false },
);

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10), null);
});

userSchema.methods.validPassport = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
