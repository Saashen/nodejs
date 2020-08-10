const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    subscription: {
      type: String,
      default: 'free',
      required: true,
    },

    token: {
      type: String,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      validate: () => this.email && this.email.includes('@'),
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

contactSchema.plugin(mongoosePaginate);

const contactModel = mongoose.model('Contact', contactSchema);

module.exports = contactModel;
