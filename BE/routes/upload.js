const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const router = express.Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// File upload route
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { file } = req;
    const { semester } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Save file details to MongoDB
    const newFile = new File({
      filename: file.originalname,
      filepath: file.path.replace(/\\/g, '/'), // Normalize path for all OS
      semester, // Store semester
    });

    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error('Error saving file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

module.exports = router;
