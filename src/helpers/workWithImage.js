const jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const resizeImage = pathFile => {
  return jimp.read(pathFile).then(img =>
    img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile),
  );
};

const renameImage = (pathFile, pathImage) =>
  fs.rename(
    pathFile,
    path.join(__dirname, '../../public/images', pathImage),
    err => {
      if (err) throw err;
    },
  );

module.exports = { resizeImage, renameImage };
