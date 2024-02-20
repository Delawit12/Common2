const fileFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('text/')) {
      req.isText = true; // Set a flag to identify text files
      cb(null, true);
    } else {
      cb(null, true); // Allow all other file types
    }
  };
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (req.body.isText) {
        cb(null, 'uploads/text/'); // Destination folder for text files
      } else {
        cb(null, 'uploads/files/'); // Destination folder for all other file types
      }
    },
    filename: function (req, file, cb) {
      if (req.body.isText) {
        cb(null, 'text-' + Date.now() + '-' + file.originalname); // File naming for text files
      } else {
        cb(null, 'file-' + Date.now() + '-' + file.originalname); // File naming for all other file types
      }
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  });