import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { startAbandonedCartJob } from './jobs/abandonedCart.cron.js';
import { startLowStockAlertJob } from './jobs/lowStockAlert.cron.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  await connectDB();

  // Start background jobs
  startAbandonedCartJob();
  startLowStockAlertJob();

  const server = app.listen(env.PORT, () => {
    logger.info(`✨ Kosh Imperial API running on port ${env.PORT} [${env.NODE_ENV}]`);
    logger.info(`💳 Active Payment Gateway: ${env.ACTIVE_PAYMENT_GATEWAY}`);
  });

  // Graceful shutdown
  const handleExit = () => {
    logger.info('Shutting down Kosh Imperial server...');
    server.close(() => {
      logger.info('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', handleExit);
  process.on('SIGINT', handleExit);
};

startServer();
