var express = require('express');
var router = express.Router();
const notes = require('../models/Upload')
const multer = require('multer');
const path = require('path')
// const { request, response } = require('../app.js');

const storage = multer.diskStorage({
  destination:function(request,file,callback){
    callback(null,'./public/images');

  },
 filename: function(request,file,callback){
  console.log(file);
  callback(null, request.body.subject + path.extname(file.originalname) )
 },
});

const upload = multer({
  storage:storage,
  limits:{
    fieldSize:1024*1024*3,
  },
})
/* GET home page. */
router.get('/',function(req,res,next){
  res.render('home',{List:notes})
})
router.get('/Note',function(req,res,next){
   res.render('Note',{title: 'Notess'})
 })
 router.get('/upload',function(req,res,next){
  res.render('Upload',{title: 'Uploads'})
})

router.post('/upload1',upload.single('image'), async (req,res,next) => {
  console.log(req.body, req.file)
  await notes.insertMany([{
    subject: req.body.subject, 
    Semesters: req.body.Semesters, 
    pdfPath: req.file.image}])
res.redirect('/');
})

router.get('/notes', async function(req, res, next){
  const allNotes = await notes.find();
  res.render('Note', {allNotes:allNotes})
})
module.exports = router;