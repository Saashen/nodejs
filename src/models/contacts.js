const Contacts = require('./schemas/contact');

const getAllContacts = () => Contacts.find();

const getOneContact = id => Contacts.findById({ _id: id });

const createContact = contact => Contacts.create(contact);

const updateContactById = (id, contact) =>
  Contacts.findByIdAndUpdate({ _id: id }, { ...contact }, { new: true });

  const removeContactById = id => Contacts.findByIdAndRemove({ _id: id });

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  updateContactById,
  removeContactById,
};
