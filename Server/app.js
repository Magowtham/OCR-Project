const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.post("/data", (req, res) => {
  req.on("data", (data) => {
    const fileData = Buffer.from(data, "base64");
  });

  req.on("end", () => {
    res.send("file recieved successfully");
  });
});

app.listen(5000, () => {
  console.log("server started at port : 5000");
});
