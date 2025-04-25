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

const uploadAvatar = multer({ storage: avatarStorage });

module.exports = {
  uploadAvatar
};
