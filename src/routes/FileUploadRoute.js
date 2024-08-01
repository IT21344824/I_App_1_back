const express = require('express');
const router = express.Router();
const cloudinary = require('../configuration/cloudinaryConfig');
const multer = require('multer');
const mongoose = require('mongoose');
const File = require('../models/File'); // Make sure this path is correct

const upload = multer({ dest: 'uploads/' });

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "images",
};

// Route handler for image upload
router.post('/uploadImage', upload.single('image'), async (req, res) => {
  try {
    const image = req.file.path; // Get the file path
    const result = await cloudinary.uploader.upload(image, opts);
    
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
