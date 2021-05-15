const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const taskSchema = require("../schemas/task.schemas");//lấy model schema
const body = require("body-parser");
app.use(body.json());
const Database = require("./database");
const db = new Database();
const Task = mongoose.model("img", taskSchema);


//lấy tất cả ảnh ra
app.get("/imgs", async (req, res) => {
  let result = await Task.find();
  res.send(result);
});


//đẩy ảnh mới lên chứa các thuộc tính
app.post("/uploadImg",  (req, res) => {
  let { id,img,name,message } = req.body;
  let task1 = new Task({//tạo các thuộc tính cho ảnh
    id: id,
    img: img,
    name:name,
    message:message,
    createDate:Date.now(),
  });
  // console.log(id,name);
  (async () => {
    await db.createTask(task1);
    res.send();
  })();
});


//Xóa ảnh dựa theo id của tấm ảnh
app.delete("/delete",  (req, res) => {
  let { id } = req.query;
  (async () => {
    await Task.findOneAndRemove(id);
    res.send();
  })();
});


//Cập nhật ảnh mới dựa vào id tấm ảnh
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
