const express = require('express');
const bodyParser= require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-type,Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
  next();
});

app.post("/api/posts",(req,res,next)=>{
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message:'Post added successfully!'
  })
});

app.get('/api/posts',(req, res, next)=>{
  const posts=[
    { id:'f98heg12', title:'First Server side post', content:'This is coming from server side' },
    { id:'arfw3r43', title:'Second Server side post', content:'This is coming from server side!' }
  ];
  res.status(200).json({
    message:'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
