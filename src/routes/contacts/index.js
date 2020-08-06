const express = require('express');
const apiRouter = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../controllers/contacts');

const {
  validateCreateUser,
  validateUpdateUser,
} = require('../../validation/contactsValidation');

const { isAuth } = require('../../validation/tokenValidation');

apiRouter
  .get('/contacts', listContacts)
  .get('/contacts/:contactId', getContactById)
  .post('/contacts', isAuth, validateCreateUser, addContact)
  .patch('/contacts/:contactId', isAuth, validateUpdateUser, updateContact)
  .delete('/contacts/:contactId', isAuth, removeContact);

module.exports = apiRouter;
