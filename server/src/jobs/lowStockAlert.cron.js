import cron from 'node-cron';
import Product from '../models/Product.js';
import { emailService } from '../services/email.service.js';
import { logger } from '../utils/logger.js';

export const startLowStockAlertJob = () => {
  // Run every 6 hours
  cron.schedule('0 */6 * * *', async () => {
    try {
      logger.info('[Cron] Scanning for low inventory items...');
      const lowStockProducts = await Product.find({ stock: { $lte: 5 }, isActive: true });

      for (const product of lowStockProducts) {
        await emailService.sendLowStockNotification(product);
      }
    } catch (err) {
      logger.error('[Cron Error] Low stock alert job failed:', err.message);
    }
  });
};
