const express = require('express');
const router = express.Router();
const cloudinary = require('../configuration/cloudinaryConfig');
const multer = require('multer');
const File = require('../models/File'); // Make sure this path is correct

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "images",
};

// Route handler for image upload
router.post('/uploadImage', upload.single('image'), async (req, res) => {
  try {
    // Convert buffer to base64
    const imageBuffer = req.file.buffer.toString('base64'); 
    const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageBuffer}`, opts);
    
    if (result && result.secure_url) {
      const file = new File({
        name: req.body.name, // Make sure the frontend sends 'name'
        imgUrl: result.secure_url
      });

      await file.save();
      return res.status(200).send(result.secure_url);
    }
    return res.status(500).send({ message: "Upload failed" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
