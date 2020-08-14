const path = require('path');
const multer = require('multer');

const upload = multer({
  dest: path.join(__dirname, '../../', 'tmp'),
  limits: { fileSize: 2000000 },
  fileFilter: (req, avatar, cb) => {
    if (avatar.mimetype.includes('image')) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

module.exports = { upload };

