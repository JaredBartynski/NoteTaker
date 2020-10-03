//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express");
const { publicDecrypt } = require("crypto");

//Sets up Express App
const app = express();
const PORT = process.env.PORT || 8080;

//Handles data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
//get notes.html
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  return res.json(fs.readFileSync("db/db.json"));
});

app.post("/api/notes", function (req, res) {
  let newPost = req.body;
  let posts = JSON.parse(fs.readFileSync("db/db.json"));

  const max = Math.max(...posts.map((post) => post.id));

  newPost.id = max + 1;

  posts.push(newPost);

  fs.writeFileSync("db/db.json", JSON.stringify(posts));

  res.json(newPost);
});
