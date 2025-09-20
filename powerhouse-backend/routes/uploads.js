// routes/uploads.js
const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// images folder in public/images
const IMAGES_DIR = path.join(__dirname, '../public/images');
if (!fs.existsSync(IMAGES_DIR)){ fs.mkdirSync(IMAGES_DIR, { recursive: true }); }

// configure so that we controll filename and location
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, IMAGES_DIR); },
  filename: (req, file, cb) => { 
    const ext = path.extname(file.originalname);
    const name = `image-${Date.now()}${ext}`;
    cb(null, name);
   }
});

const upload = multer({
  storage,
  limits: {fileSize: 5 * 1024 * 1024},
  fileFilter: (req, file, cb) => {
    if(/^image\/(jpe?g|png|jpg|gif)$/.test(file.mimetype)){ cb(null, true); }
    else { cb(new Error('Only JPEG, PNG or GIF images allowed')); } 
  }
});

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) { return res.status(400).json({ error: 'No file uploaded' }); }

  //build a poblic URL
  const host = req.get('host');
  const protocol = req.protocol;
  const imageUrl = `${protocol}://${host}/images/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = {router, upload};