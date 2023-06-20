const express = require("express");
const cors = require("cors");
const fs = require("fs");
const tmp = require("tmp");
const pdfjsLib = require("pdfjs-dist");
const { title } = require("process");
const Tesseract = require("tesseract.js");

const app = express();
app.use(cors());
app.use(express.json());

const tempDir = tmp.dirSync();
const folderPath = tempDir.name;

let chunks = 0;

const tempFilePath = `${folderPath}/temp-file.bin`;
const fileStream = fs.createWriteStream(tempFilePath);

//performing OCR opearation
function performOCROnFile(filePath) {
  console.log(filePath);
  Tesseract.recognize(filePath)
    .then((result) => {
      console.log("OCR Result:", result.data.text);
    })
    .catch((err) => {
      console.error("OCR Error:", err);
    });
}

app.post("/data", (req, res) => {
  req.on("data", async (chunk) => {
    fileStream.write(chunk);
  });

  req.on("end", async () => {
    performOCROnFile(tempFilePath);
  });
});

app.listen(5000, () => {
  console.log(`Server started at : 5000 port`);
});
