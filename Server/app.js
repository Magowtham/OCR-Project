const express = require("express");
const cors = require("cors");
const fs = require("fs");
const tmp = require("tmp");
const pdfjsLib = require("pdfjs-dist");
const { title } = require("process");

const app = express();
app.use(cors());
app.use(express.json());

let buffer = Buffer.alloc(0);
const tempDir = tmp.dirSync();
const folderPath = tempDir.name;

const tempFilePath = `${folderPath}/temp-file.bin`;
const fileStream = fs.createWriteStream(tempFilePath);

let chunk = 0;
let totalSize = 0;
const chunkBuffers = [];

app.post("/data", (req, res) => {
  req.on("data", (chunk) => {
    chunkBuffers.push(chunk);
    totalSize += chunk.length;
  });

  req.on("end", async () => {
    chunk++;
    console.log(chunk);
    if (Number(req.headers.totalchunks) === chunk) {
      const fileBuffer = Buffer.concat(chunkBuffers, totalSize);
      fileStream.write(fileBuffer);
      fileStream.end();

      fs.readFile(tempFilePath, (err, data) => {
        console.log(data);
      });
    }
  });
});

app.listen(5000, () => {
  console.log(`Server started at : 5000 port`);
});
