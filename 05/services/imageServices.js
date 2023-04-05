const fsExtra = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const multer = require('multer');
const uuid = require('uuid').v4;

const AppError = require('../utils/appError');

// static method - той метод, який викликається від класу, а не від екземпляру
class ImageService {
  static upload(name) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith('image')) {
        cb(null, true);
      } else {
        cb(new AppError(400, 'Please upload image only'), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, options, ...pathSegments) {
    const fileName = `${uuid()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), 'static', ...pathSegments);

    await fsExtra.ensureDir(fullFilePath);

    await sharp(file.buffer)
      .resize(options || { height: 500, width: 500 })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}

module.exports = ImageService;

// process.cwd() — це вбудований інтерфейс прикладного програмування модуля процесу ,
// який використовується для отримання поточного робочого каталогу процесу node.js.
