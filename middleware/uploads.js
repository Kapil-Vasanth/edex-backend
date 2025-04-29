const multer = require('multer');
const fs = require('fs');
const path = require('path');

const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const studentId = req.params.id;
    const dir = path.join(__dirname, '..', 'uploads', studentId);

    // Ensure the folder exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, 'avatar' + ext); // Save as avatar.jpg/png/etc.
  }
});

const documentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const studentId = req.params.id;
    const dir = path.join(__dirname, '..', 'uploads', studentId, 'documents');

    // Ensure the folder exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Save with a unique name
  }
});

const uploadAvatar = multer({ storage: avatarStorage });

const uploadDocument = multer({ 
  storage: documentStorage,
  limits: { fileSize: 40 * 1024 * 1024 }, // 40 MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only PDF, JPG, and PNG files are allowed'), false);
    }
    cb(null, true);
  }
});

module.exports = {
  uploadAvatar,
  uploadDocument
};
