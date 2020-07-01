const { listContacts } = require('../controllers/contacts');

const getContacts = () => {
  console.log("result: ", listContacts);
};

module.exports = getContacts;
