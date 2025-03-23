/**
 * This file connects to a local database in development and
 * the the real databse if in production
 */

import mongoose, { Connection } from "mongoose";
import "dotenv/config";

const uri =
  process.env.MODE === "development"
    ? // This is a local database server for testing purposes
      "mongodb://127.0.0.1:27017/news-app"
    : process.env.MONGO_URI;

mongoose.connect(uri);

const connection = mongoose.connection;

export default connection as Connection;
