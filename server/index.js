const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserModel = require("./models/UsersModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//Set up default mongoose connection
const mongoURI =
  "mongodb+srv://kiran:fn9YKFFE6Ifp7gCF@kiran.rx3bd.mongodb.net/crud";
mongoose.connect(mongoURI).then(() => {
  console.log("connect successful");
});

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

app.post("/api/addUser", async (req, res) => {
  // UserModel.create(req.body)
  // .then(users => res.json(users))
  // .catch(err => res.json(err))

  try {
    const user = new UserModel(req.body);
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: "Error saving item", error: err });
  }
});

app.get("/api/getUser", async (req, res) => {
  // UserModel.find({})
  // .then(users => res.json(users))
  // .catch(err => console.log(err))

  try {
    const getUser = await UserModel.find({});
    res.status(200).json(getUser);
  } catch (err) {
    res.status(400).json({ message: "Error saving item", error: err });
  }
});

app.get("/api/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.find({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});


app.put("/api/updateUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/api/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

//  Image uploading

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Route to handle image upload
app.post("/upload", upload.single("image"), async (req, res) => {

  const user = new UserModel({
    name: "image",
    email: "image@gmail.com",
    age: 10,
    url: `http://localhost:3001/uploads/${req.file.filename}`,
  });
    const savedUser = await user.save();

  res.json({
    message: "Image uploaded successfully",
    imageUrl: `http://localhost:3001/uploads/${req.file.filename}`,
  });
});

// Route to serve uploaded images
app.use("/uploads", express.static("uploads"));

app.listen(3001, () => {
  console.log("Server is running");
});
