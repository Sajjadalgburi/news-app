/**
 * This file connects to a local database in development and
 * the the real databse if in production
 */

import mongoose, { Connection } from "mongoose";
import "dotenv/config";

const mode = process.env.NODE_ENV;
const mongoCloudUri = process.env.MONGO_URI;

if (!mode || !mongoCloudUri) {
  throw new Error(
    "Either MODE or MONGO_URI is not defined in environment variables",
  );
}

const uri =
  mode === "development"
    ? // This is a local database server for testing purposes
      "mongodb://127.0.0.1:27017/news-app"
    : mongoCloudUri;

mongoose.connect(uri);
const connection = mongoose.connection;
export default connection as Connection;
