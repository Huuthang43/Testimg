const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  id:Number,
  img:String,
  name:String,
  message:String
});


module.exports = taskSchema;