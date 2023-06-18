const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

const fileStream = fs.createWriteStream("temp-file.bin");
let buffer = Buffer.alloc(0);

const bufferSize = 1024 * 1024;

app.post("/data", (req, res) => {
  req.on("data", (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    if (buffer.length > bufferSize) {
      fileStream.write(buffer);
      buffer = Buffer.alloc(0);
    }
  });

  req.on("end", () => {
    res.send("data recieved");
  });
});

app.listen(5000, () => {
  console.log(`Server started at : 5000 port`);
});
