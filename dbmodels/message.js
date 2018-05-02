const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var schema = new Schema({
  email: {type: String, required: true},
  message: {type: String, required: false}
});

module.exports = mongoose.model("Message", schema);
