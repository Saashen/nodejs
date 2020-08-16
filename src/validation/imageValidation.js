const isImage = (req, res, next) =>
  req.file ? next() : res.status(401).send({ message: 'missing avatar file' });

module.exports = { isImage };
