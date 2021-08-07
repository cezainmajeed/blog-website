//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Hi, I am Cezain Majeed, a pre-final year student pursuing B.Tech in Electrical Engineering from National Institute of Technology, Jamshedpur.";
const aboutContent = "Hi, I am Cezain Majeed, a pre-final year student pursuing B.Tech in Electrical Engineering from National Institute of Technology, Jamshedpur. I am a Web developer and a Programmer. I am currently learning the MERN Stack, Data Structures, Algorithms as well as working to sharpen my problem solving skills. I love to code, learn and explore new things - tech related or otherwise, and it brings me immense pleasure to build something from scratch. In my leisure time I like to play volleyball. ";
const contactContent = "You can contact me through these modes.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://",{useNewUrlParser:true,useUnifiedTopology: true});

const postSchema=new mongoose.Schema({
  title:{
    type:String
  },
  content:{
    type:String
  }
});

const Post=mongoose.model("Post",postSchema);

app.get("/",function(req,res){
  Post.find({},function(err,posts){
    if(err)
    console.log(err);
    else
    {
      res.render("home",{
        homecontent:homeStartingContent,
        posts:posts
      });
    }
  });
});

app.get("/about",function(req,res){
  res.render("about",{
    aboutcontent:aboutContent,
  });
});

app.get("/contact",function(req,res){
  res.render("contact",{
    contactcontent:contactContent,
  });
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
    const postTitle=req.body.title;
    const postContent=req.body.post;

  const post=new Post({
    title:postTitle,
    content:postContent
  });
  post.save();
  res.redirect("/");
});


app.get("/posts/:postId",function(req,res){
  const requestPostId = req.params.postId;
  Post.findOne({_id:requestPostId},function(err,foundPost){
    res.render("post",{
      title:foundPost.title,
      content:foundPost.content
    })
  });
});





app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
