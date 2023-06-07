// const Tesseract = require("tesseract.js");

// (async () => {
//   const worker = await Tesseract.createWorker();
//   await worker.load();
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');

//   const { data: { text } } = await worker.recognize('../testImages/test-eng1.png');
//   console.log(`Hey this get converted....\n\n ${text}`);

//   await worker.terminate();
// })();

const express=require("express");
const app=new express();
const multer=require("multer");
const Tesseract=require("tesseract.js");

const upload=multer({dest:"uploads/"});

app.post("/upload",upload.single("file"),(req,res)=>{
  res.json({"status":"uploaded"});
})


app.listen(3001, () => {
  console.log('Server is running on port 3000');
});