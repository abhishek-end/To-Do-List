const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const connectDB = require("./DB/configdb");
const router = require("./routes/userRoutes");
const errorHandle = require("./middleware/errorHandle");
const cors = require("cors");

connectDB();

// define cors for allow third party access links
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

// parser
app.use(express.json());
//remove after deploy
app.get("/", (req, res) => {
  res.send(`Server is Running on PORT ${port}`);
});
app.use("/", router);
//handle errors
app.use(errorHandle);
app.listen(port, () => {
  console.log(`Express Server Started On port ${port}`);
});
