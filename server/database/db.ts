import mongoose from "mongoose";

// todo : add proper mongo db string
const uri = process.env.MONGODB_URI || "";

export const connectToDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log(" ---- MongoDB connected ---- ");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
