import cron from 'node-cron';
import Cart from '../models/Cart.js';
import { logger } from '../utils/logger.js';

export const startAbandonedCartJob = () => {
  // Run once daily at 2:00 AM
  cron.schedule('0 2 * * *', async () => {
    try {
      logger.info('[Cron] Running abandoned cart check...');
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const abandonedCarts = await Cart.find({
        updatedAt: { $lt: oneDayAgo },
        'items.0': { $exists: true },
      }).populate('user', 'email name');

      logger.info(`[Cron] Found ${abandonedCarts.length} abandoned cart(s) for email reminders.`);
    } catch (err) {
      logger.error('[Cron Error] Abandoned cart job failed:', err.message);
    }
  });
};
