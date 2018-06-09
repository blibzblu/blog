const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema({
  "publish-code": {type: Number, required: true},
  "title": {type: String, required: true},
  "content": {type: String, required: true}
});

module.exports = mongoose.model("BlogEntry", schema);
