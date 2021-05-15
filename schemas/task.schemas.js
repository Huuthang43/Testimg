const mongoose = require("mongoose");
//model schema cho mongoose
const taskSchema = new mongoose.Schema({
  id:Number,
  img:String,
  name:String,
  message:String,
  createDate:Date,
});


module.exports = taskSchema;