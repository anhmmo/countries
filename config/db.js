const mongoose = require("mongoose");

const connectDB = async () => {
  let MONGODB_URI = process.env.MONGO_URI;
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
};

module.exports = connectDB;
