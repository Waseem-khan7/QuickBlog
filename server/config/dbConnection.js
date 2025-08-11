import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    mongoose.connect();
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToDatabase;
