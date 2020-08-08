const Contacts = require('./schemas/contact');

const getAllContacts = async ({ page, limit, sub }) => {
  const options = {
    page,
    limit,
    collation: {
      locale: 'en',
    },
  };

  const queryCriteria = sub && sub.length ? { subscription: sub } : {};

  return Contacts.paginate(queryCriteria, options, (err, result) =>
    err ? err : result.docs,
  );
};

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
