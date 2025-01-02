const express = require('express');
const path = require('path');
const File = require('../models/File');
const router = express.Router();

// Serve the static files (uploaded PDFs) from the 'uploads' directory
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Fetch all notes grouped by semester
router.get('/', async (req, res) => {
  try {
    const notes = await File.find();
    const groupedNotes = notes.reduce((acc, note) => {
      const semester = note.semester || 'Uncategorized'; // Use semester or 'Uncategorized'
      if (!acc[semester]) acc[semester] = [];
      acc[semester].push(note);
      return acc;
    }, {});

    res.status(200).json(groupedNotes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Error fetching notes' });
  }
});

// Serve PDFs (for viewing) - Optional: You may not need this if you're using static serving
router.get('/uploads/:filename', (req, res) => {
  const filename = decodeURIComponent(req.params.filename);
  const filePath = path.join(__dirname, '../uploads', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error serving file:', err);
      res.status(404).json({ error: 'File not found' });
    }
  });
});

module.exports = router;
