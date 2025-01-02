const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
  semester: {
    type: String, // Store the semester info if needed
    required: false,
  },
});

module.exports = mongoose.model('File', fileSchema);
