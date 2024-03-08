const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function(req, file, cb) {
    // Set the filename to be unique by appending a timestamp to the original filename
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Initialize multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Set file size limit (in bytes), here it's 1MB
  fileFilter: function(req, file, cb) {
    // Check file type
    checkFileType(file, cb);
  }
}).array('images', 5); // 'images' is the name attribute of the file input field in the form, 5 is the maximum number of files allowed

// Function to check file type
function checkFileType(file, cb) {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png/;
  // Check the extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only! (JPEG, JPG, PNG)');
  }
}

module.exports = upload;
