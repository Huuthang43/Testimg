const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const taskSchema = require("../schemas/task.schemas");
const body = require("body-parser");
app.use(body.json());
const Database = require("./database");
const db = new Database();
const Task = mongoose.model("img", taskSchema);

app.get("/imgs", async (req, res) => {
  let result = await Task.find();
  res.send(result);
});

app.post("/uploadImg",  (req, res) => {
  let { id,img,name,message } = req.body;
  let task1 = new Task({
    id: id,
    img: img,
    name:name,
    message:message
  });
  // console.log(id,name);
  (async () => {
    await db.createTask(task1);
    res.send();
  })();
});

app.delete("/delete",  (req, res) => {
  let { id } = req.query;
  (async () => {
    await Task.findOneAndRemove(id);
    res.send();
  })();
});

app.put("/update",  (req, res) => {
  let { id,img } = req.body;
  // console.log(id,img)
  (async () => {
    await Task.findOneAndUpdate(id, {
      img: img
    })
    res.send();
  })();
})

module.exports = app;
