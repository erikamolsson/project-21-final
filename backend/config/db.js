import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const dbConnect = async () => {
  const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";

  try {
    await mongoose.connect(mongoUrl);
    mongoose.Promise = Promise;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};


module.exports = dbConnect;