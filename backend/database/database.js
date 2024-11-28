import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    return await mongoose.connect(process.env.MONGODB_URL);
  } catch (e) {
    console.log(`Error Connecting DB, Error: ${e.message}`);
    return null;
  }
};

export const database = { connectToDb };
