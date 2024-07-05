import mongoose from "mongoose";
import { config } from "./config";

const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    // we use this line if our connection gets disconnected
    mongoose.connection.on("error", (err) => {
      console.error(`Error in conecting to database: ${err}`);
    });
    //this line is preferably kept on last
    mongoose.connect(config.mongoURI as string);
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};
export default connectDb;
