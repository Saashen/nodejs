const express = require('express');
const apiRoutes = express.Router();

const getContacts = require('./routers/getContacts');

apiRoutes.get('/api/contacts', getContacts);

// @ GET /api/contacts
// @ GET /api/contacts/:contactId
// @ POST /api/contacts
// @ DELETE /api/contacts/:contactId
// @ PATCH /api/contacts/:contactId

module.exports = apiRoutes;
