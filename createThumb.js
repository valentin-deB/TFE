import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const watchedFolder = './public/content/oneBit/desktop/desktopImages';
const thumbnailsFolder = './public/content/oneBit/desktop/desktopImages/thumb';
const thumbnailWidth = 75;
const thumbnailHeight = 75;

// Delete existing thumbnails
fs.readdirSync(thumbnailsFolder).forEach(file => {
  const filePath = path.join(thumbnailsFolder, file);
  fs.unlinkSync(filePath);
});

// Create new thumbnails
fs.readdirSync(watchedFolder).forEach(file => {
  const filePath = path.join(watchedFolder, file);

  // Ensure the file is not a directory
  if (fs.lstatSync(filePath).isFile()) {
    sharp(filePath)
      .resize(thumbnailWidth, thumbnailHeight)
      .toFile(path.join(thumbnailsFolder, file))
      .catch(err => console.error(err));
  }
});
