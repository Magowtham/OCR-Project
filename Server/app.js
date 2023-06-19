const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
const fileStream = fs.createWriteStream("temp-file.bin");

let buffer = Buffer.alloc(0);

app.post("/data", (req, res) => {
  req.on("data", (chunk) => {
    console.log(chunk);
  });
});

app.listen(5000, () => {
  console.log(`Server started at : 5000 port`);
});
