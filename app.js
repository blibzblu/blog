const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");

const SavedEntry = require(__dirname + "/dbmodels/savedEntry");
const PublishedEntry = require(__dirname + "/dbmodels/publishedEntry");
const User = require(__dirname + "/dbmodels/user");

mongoose.connect(process.env.DBURL);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  let postID = req.query.postid;

  if(!postID){
    // postID should automagically be set to the latest entry
    postID = 1;
  }

  PublishedEntry.findOne({"publish-code": postID}, (err, doc) => {
    if(err) throw err;

    if(doc){
      res.render("viewPost", {"title": doc.title, "content": doc.content});
    } else {
      // Post does not exist
      res.redirect("/");
    }
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  User.find({"username": req.body.un}, (err, docs) => {
    if(err) throw err;

    if(docs.length > 0){
      bcrypt.compare(req.body.pw, docs[0].password, (err, resp) => {
        if(err) throw err;

        if(resp){
          req.login(docs[0]._id, err => {if(err) throw err;});
          res.redirect("/editor");
        } else {
          // Invalid Credentials
          res.redirect("/");
        }
      });
    } else {
      // No such User
      res.redirect("/");
    }
  });
});

app.get("/editor", (req, res) => {
  res.render("editor");
});

app.post("/save-entry", (req, res) => {
  let newEntry = new SavedEntry({
    "title": req.body.title,
    "content": req.body.content
  });

  newEntry.save(err => {console.log(err)});
});

app.post("/publish-entry", (req, res) => {
  PublishedEntry.count((err, count) => {
    let newEntry = new PublishedEntry({
      "publish-code": count + 1,
      "title": req.body.title,
      "content": req.body.content
    });

    newEntry.save(err => {console.log(err)});
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("App Listening on Port: " + port);
});

passport.serializeUser(function(uid, done){
  done(null, uid);
});

passport.deserializeUser(function(uid, done){
  done(null, uid);
});
