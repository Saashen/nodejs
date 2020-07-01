const fs = require('fs');
const path = require('path');
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, '../..', 'db', 'contacts.json');

function listContacts() {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data).find(contact => contact.id === contactId));
  });
}

async function removeContact(contactId) {
  const data = await fsPromises.readFile(contactsPath, 'utf-8');
  const newData = JSON.parse(data).filter(contact => contact.id !== contactId);

  fs.writeFile(contactsPath, JSON.stringify(newData), err => {
    if (err) throw err;
    console.table(newData);
  });
}

async function addContact(name, email, phone) {
  const data = await fsPromises.readFile(contactsPath, 'utf-8');
  const newData = JSON.parse(data);

  const newContact = {
    id: newData.length + 1,
    name,
    email,
    phone,
  };

  newData.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(newData), err => {
    if (err) throw err;
    console.table(newData);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
