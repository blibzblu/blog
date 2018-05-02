const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Message = require(__dirname + "/dbmodels/message");

mongoose.connect(process.env.DBURL);

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.render("index");
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
