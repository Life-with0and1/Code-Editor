const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error while connecting to the database->", error);
  }
}

connectDB();
