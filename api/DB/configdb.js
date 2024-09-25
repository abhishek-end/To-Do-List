const mongoose = require("mongoose");

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.log("Error Connecting Database", error);
    process.exit(1);
  }
};
module.exports = mongoConnect;
