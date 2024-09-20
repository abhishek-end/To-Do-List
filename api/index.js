const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`Server is Running on PORT ${port}`);
});

app.listen(port, () => {
  console.log(`Express Server Started On port ${port}`);
});
