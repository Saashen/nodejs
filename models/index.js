require('./mongoose');
const contactModel = require('./schema/contact');

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactModel.find();
    res.status(200).send(contacts);
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactModel.findById({ _id: contactId });
    contact
      ? res.status(200).send(contact)
      : res.status(404).send({ message: 'Not found' });
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await contactModel.create(req.body);
    res.status(201).send(contact);
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactModel.findByIdAndUpdate(
      { _id: contactId },
      { ...req.body },
      { new: true },
    );
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
    const contact = await contactModel.findByIdAndRemove({ _id: contactId });
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
