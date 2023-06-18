const express = require("express");
const cors = require("cors");
const fs = require("fs");
const os = require("os");

const app = express();
app.use(cors());

//temparay directory
const tempDir = fs.mkdtempSync(`${os.tmpdir()}/`);

const bufferFilePath = `${tempDir}/temp_buffer_file.bin`;
const writableStream = fs.createWriteStream(bufferFilePath);

app.post("/data", (req, res) => {
  const readableStream = req;
  readableStream.pipe(writableStream);

  req.on("data", (chunk) => {
    writableStream.write(chunk);
  });
  req.on("end", () => {
    console.log(writableStream);
    res.send("data recieved successfully.");
  });
});

app.listen(5000, () => {
  console.log(`Server started at : 5000 port`);
});
