const express = require("express");

const Post = require('../models/post');
const multer = require('multer');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isvalid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");
    if(isvalid){
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext );
  }
});

router.post("", multer({storage: storage}).single("image") ,(req,res,next)=>{
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
  });
  post.save().then(CreatedPost => {
    res.status(201).json({
      message:'Post added successfully!',
      post: {
        ...CreatedPost,
        id: CreatedPost._id,
      }
    });
  });

});

router.get('',(req, res, next)=>{
  Post.find().then(documents => {
    res.status(200).json({
      message:'Posts fetched successfully!',
      posts: documents
    });
  } );
});

router.put("/:id",  multer({storage: storage}).single("image") ,(req, res, next)=>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id},post).then(result => {

    res.status(200).json({
      message:'Edit successfull!'
    });
  });
});

router.get("/:id",( req, res, next ) =>{
  Post.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post not found!'
      });
    }
  });
});

router.delete("/:id",(req, res, next)=>{
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Post Deleted'
      });
  });
});

module.exports = router;