const fs = require('fs');
const path = require('path');
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, '../..', 'db', 'contacts.json');

function listContacts(req, res, next) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
}

function getContactById(req, res, next) {
  const { contactId } = req.params;

  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    if (err) throw err;
    const pickedContact = JSON.parse(data).find(
      contact => contact.id === Number(contactId),
    );

    if (!pickedContact) res.status(404).send({ message: 'Not found' });
    res.status(200).send(pickedContact);
  });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const data = await fsPromises.readFile(contactsPath, 'utf-8');
  const parsedData = JSON.parse(data);

  const targetContactIndex = parsedData.findIndex(
    contact => contact.id === Number(contactId),
  );

  if (targetContactIndex === -1) {
    res.status(404).send({ message: 'Not found' });
  }

  parsedData[targetContactIndex] = {
    ...parsedData[targetContactIndex],
    ...req.body,
  };

  fs.writeFile(contactsPath, JSON.stringify(parsedData), err => {
    if (err) throw err;
    res.status(200).send(parsedData[targetContactIndex]);
  });
}

async function removeContact(req, res, next) {
  const { contactId } = req.params;

  const data = await fsPromises.readFile(contactsPath, 'utf-8');
  const parsedData = JSON.parse(data);

  const targetContactIndex = parsedData.findIndex(
    contact => contact.id === Number(contactId),
  );

  if (targetContactIndex === -1) {
    res.status(404).send({ message: 'Not found' });
  }

  const newData = parsedData.filter(
    contact => contact.id !== Number(contactId),
  );

  fs.writeFile(contactsPath, JSON.stringify(newData), err => {
    if (err) throw err;
    res.status(200).send({ message: 'contact deleted' });
  });
}

async function addContact(req, res, next) {
  function getRandomInteger() {
    return Math.floor(Math.random() * (100 - 11)) + 11;
  }

  const data = await fsPromises.readFile(contactsPath, 'utf-8');
  const newData = JSON.parse(data);

  const newContact = {
    id: getRandomInteger(),
    ...req.body,
  };

  newData.push(newContact);

  fs.writeFile(contactsPath, JSON.stringify(newData), err => {
    if (err) throw err;
    res.status(201).send(newContact);
  });
}

module.exports = {
  listContacts,
  getContactById,
  updateContact,
  removeContact,
  addContact,
};
