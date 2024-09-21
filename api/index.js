const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const connectDB = require("./DB/configdb");
const router = require("./routes/userRoutes");

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Server is Running on PORT ${port}`);
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Express Server Started On port ${port}`);
});
