import mongoose from 'mongoose';
import { env } from './env.js';
import dns from 'node:dns';

// Fix for Windows & local ISP DNS dropping SRV queries (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch {
  // Ignore in environments that disallow overriding DNS
}

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
