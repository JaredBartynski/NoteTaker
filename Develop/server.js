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
