const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const BlogEntry = require(__dirname + "/dbmodels/blogEntry");

mongoose.connect(process.env.DBURL);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  let postID = req.query.postid;

  if(!postID){
    // postID should automagically be set to the latest entry
    postID = "000001";
  }

  switch(postID){
    case "000001":
      res.render("first-post");
      break;

    case "000002":
      res.render("post-2");
      break;
    }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  console.log(req.body);
});

app.get("/editor", (req, res) => {
  res.render("editor");
});

app.post("/save-entry", (req, res) => {
  let newEntry = new BlogEntry({
    "publish-code": 0,
    "title": req.body.title,
    "content": req.body.entry
  });

  newEntry.save(err => {console.log(err)});
});

app.post("/message", (req, res) => {
  let newMessage = new Message({
    email: req.body.email,
    message: req.body.message
  });

  newMessage.save(err => {
    if(err) res.redirect("/");
  });

  res.render("thanks");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("App Listening on Port: " + port);
});
