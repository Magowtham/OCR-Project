const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.post("/dataa", (req, res) => {
  res.send("data recieved successfully");
});

app.listen(5000, () => {
  console.log(`Server started at : 5000 port`);
});
