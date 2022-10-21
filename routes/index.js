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
// router.get('/Note',function(req,res,next){
//    res.render('Note',{title: 'Notess'})
//  })
 router.get('/upload',function(req,res,next){
  res.render('Upload',{title: 'Uploads'})
})

router.post('/upload1',upload.single('image'), async (req,res,next) => {
  console.log(req.body, req.file)
  await notes.insertMany([{
    subject: req.body.subject, 
    Semesters: req.body.Semesters, 
    pdfPath: req.body.subject + path.extname(req.file.originalname)}])
res.redirect('/');
})

// router.get('/notes', async function(req, res, next){
//   const allNotes = await notes.find();
//   res.render('Note', {allNotes:allNotes})
// })


router.get('/Sem-1', async function(req, res, next){
  const allNote = await notes.find({Semesters:'Semester-1'});
  res.render('Sem-1', {allNotes:allNote});
})
router.get('/Sem-2', async function(req, res, next){
  const allNote = await notes.find({Semesters:'Semester-2'});
  res.render('Sem-2', {allNotes:allNote});
})
router.get('/Sem-3', async function(req, res, next){
  const allNote = await notes.find({Semesters:'Semester-3'});
  res.render('Sem-3', {allNotes:allNote});
})
router.get('/Sem-4', async function(req, res, next){
  const allNote = await notes.find({Semesters:'Semester-4'});
  res.render('Sem-4', {allNotes:allNote});
})
router.get('/Sem-5', async function(req, res, next){
  const allNote = await notes.find({Semesters:'Semester-5'});
  res.render('Sem-5', {allNotes:allNote});
})
router.get('/Sem-6', async function(req, res, next){
  const allNote = await notes.find({Semesters:'Semester-6'});
  res.render('Sem-6', {allNotes:allNote});
})
router.get('/Sem-7', async function(req, res, next){
  const allNote = await notes.find({Semesters:'Semester-7'});
  res.render('Sem-7', {allNotes:allNote});
})
router.get('/Sem-8', async function(req, res, next){
  const allNote = await notes.find({Semesters:'Semester-8'});
  res.render('Sem-8', {allNotes:allNote});
})

module.exports = router;

