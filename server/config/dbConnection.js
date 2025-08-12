import mongoose from "mongoose";
import "dotenv/config";
const connectToDatabase = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToDatabase;
