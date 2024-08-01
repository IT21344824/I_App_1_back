const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/File'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { firstname } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const newFile = new File({
            firstname: firstname,
            filename: file.originalname,
            fileData: file.buffer,
            contentType: file.mimetype,
        });

        await newFile.save();
        res.status(200).send('File uploaded and saved successfully.');
    } catch (error) {
        res.status(500).send('Error uploading file: ' + error.message);
    }
});

module.exports = router;
