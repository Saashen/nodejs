const { contacts } = require('../models');

const listContacts = async (req, res, next) => {
  try {
    const result = await contacts.getAllContacts();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getOneContact(contactId);
    contact
      ? res.status(200).send(contact)
      : res.status(404).send({ message: 'Not found' });
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await contacts.createContact(req.body);
    res.status(201).send(contact);
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.updateContactById(contactId, req.body);
    contact
      ? res.status(200).send(contact)
      : res.status(404).send({ message: 'Not found' });
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.removeContactById(contactId);
    contact
      ? res.status(200).send({ message: 'Contact deleted' })
      : res.status(404).send({ message: 'Not found' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
