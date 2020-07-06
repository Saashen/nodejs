const express = require('express');
const apiRouter = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('./controllers/contacts');
const {
  validateCreateUser,
  validateUpdateUser,
} = require('./controllers/validation');

apiRouter.get('/contacts', listContacts);
apiRouter.get('/contacts/:contactId', getContactById);
apiRouter.post('/contacts', validateCreateUser, addContact);
apiRouter.delete('/contacts/:contactId', removeContact);
apiRouter.patch('/contacts/:contactId', validateUpdateUser, updateContact);

module.exports = apiRouter;
