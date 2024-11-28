import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    return await mongoose.connect(process.env.MONGO_URI);
  } catch (e) {
    console.log(`Error Connecting DB, Error: ${e.message}`);
    return null;
  }
};

export const database = { connectToDb };
