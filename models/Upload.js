const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UploadSchema = new Schema({
  subject: 
  {
    type: String,
    required: true
},
 Semesters: String,
 pdfPath: String
}, {timestamps: true}); 

module.exports = mongoose.model('Upload',UploadSchema);