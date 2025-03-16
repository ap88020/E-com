const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

// Define Uploads Directory
const uploadDir = path.join(__dirname, '../public/images/uploads');

// ✅ Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // ✅ Using ensured directory path
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, buf) => {
            if (err) return cb(err);
            cb(null, buf.toString('hex') + path.extname(file.originalname)); // ✅ Correct filename logic
        });
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
