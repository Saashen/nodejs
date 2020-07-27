const express = require('express');
const apiRouter = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../models');

const {
  validateCreateUser,
  validateUpdateUser,
} = require('../controllers/validation');

apiRouter.get('/contacts', listContacts);
apiRouter.get('/contacts/:contactId', getContactById);
apiRouter.post('/contacts', validateCreateUser, addContact);
apiRouter.patch('/contacts/:contactId', validateUpdateUser, updateContact);
apiRouter.delete('/contacts/:contactId', removeContact);

module.exports = apiRouter;
