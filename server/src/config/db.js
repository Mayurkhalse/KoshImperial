import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Warning] MongoDB connection error: ${error.message}`);
    console.warn(`[Database Fallback] Note: Verify MongoDB is running locally on port 27017 or set MONGO_URI in .env`);
    return null;
  }
};
