const express = require("express");
const cors = require("cors");
const fs = require("fs");
const tmp = require("tmp");
const pdfjsLib = require("pdfjs-dist");
const { error } = require("console");

const app = express();
app.use(cors());

//temparay directory
const tmpDir = tmp.dirSync();
const tempDirPath = tmpDir.name;

const writableStream = fs.createWriteStream(`${tempDirPath}/temp_file.bin`);
let i = 0;
app.post("/data", (req, res) => {
  console.log(req.body);
  const readableStream = req;
  //creating pipe linig to handle reading and writing backpressure.
  readableStream.pipe(writableStream);

  req.on("data", (chunk) => {
    console.log(chunk);
    writableStream.write(chunk);
  });

  req.on("end", () => {
    res.send("data recieved successfully.");
  });

  writableStream.once("finish", () => {
    fs.readFile(`${tempDirPath}/temp_file.bin`, (err, data) => {
      if (err) {
        console.log("Error reading the temp file");
        return;
      }
    });
  });

  writableStream.once("error", (error) => {
    console.error("Error writing to the temp file: ", error);
  });
});

app.listen(5000, () => {
  console.log(`Server started at : 5000 port`);
});
