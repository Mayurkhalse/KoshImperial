import mongoose from 'mongoose';
import { env } from '../config/env.js';
import PageContent from '../models/PageContent.js';
import dns from 'node:dns';

try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch {}

const updateEyebrow = async () => {
  try {
    console.log('[Update] Connecting to MongoDB...');
    await mongoose.connect(env.MONGO_URI);
    
    const page = await PageContent.findOne({ pageKey: 'home-hero' });
    if (page) {
      page.blocks = page.blocks.map(b => {
        if (b.key === 'eyebrow') {
          return { key: 'eyebrow', value: 'KOSH IMPERIAL — THE ART OF CONSCIOUS LIVING' };
        }
        return b;
      });
      await page.save();
      console.log('[Update] Successfully updated home-hero eyebrow in MongoDB Atlas!');
    } else {
      console.log('[Update] home-hero pageKey not found in database.');
    }
    process.exit(0);
  } catch (err) {
    console.error('[Update Error]', err.message);
    process.exit(1);
  }
};

updateEyebrow();
