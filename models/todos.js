const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
});
const ToDos = mongoose.model("todos", schema);

module.exports = ToDos;
