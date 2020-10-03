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
  return res.json(JSON.parse(fs.readFileSync("db/db.json")));
});

app.post("/api/notes", function (req, res) {
  let newPost = req.body;
  let posts = JSON.parse(fs.readFileSync("db/db.json"));

  const max = Math.max(...posts.map((post) => post.id));

  if (max > 0) {
    newPost.id = max + 1;
  } else {
    newPost.id = 1;
  }

  posts.push(newPost);

  fs.writeFileSync("db/db.json", JSON.stringify(posts));

  res.json(newPost);
});

//delete /api/notes/:id
app.delete("/api/notes/:id", function (req, res) {
  let idDelete = parseInt(req.params.id);

  let posts = JSON.parse(fs.readFileSync("db/db.json"));

  posts = posts.filter((post) => post.id !== idDelete);

  fs.writeFileSync("db/db.json", JSON.stringify(posts));

  res.json({});
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running on port:8080");
});
