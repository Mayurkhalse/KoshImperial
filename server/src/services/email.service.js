import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';

class EmailService {
  constructor() {
    this.hasApiKey = Boolean(env.EMAIL_SERVICE_API_KEY);
    if (this.hasApiKey) {
      this.transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: env.EMAIL_SERVICE_API_KEY,
        },
      });
      logger.info('[EmailService] Configured with live provider');
    } else {
      logger.info('[EmailService] API key not provided — console fallback active');
    }
  }

  async sendOrderConfirmation(order, user) {
    const subject = `Order Confirmed — ${order.orderNumber} | Kosh Imperial`;
    const html = `
      <div style="font-family: serif; color: #253929; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #D4C4A8; background-color: #F7F6E4;">
        <h1 style="color: #253929; border-bottom: 2px solid #774D31; padding-bottom: 8px;">KOSH IMPERIAL</h1>
        <p style="font-size: 16px; color: #774D31;">Thank you for your conscious purchase, ${user.name || 'Valued Customer'}.</p>
        <p>Your order <strong>${order.orderNumber}</strong> has been successfully placed.</p>
        <p>Total: ₹${order.total.toLocaleString('en-IN')}</p>
        <p style="font-style: italic; color: #3A5647;">"Heirloom goods that honor the earth."</p>
      </div>
    `;

    if (this.hasApiKey && this.transporter) {
      try {
        await this.transporter.sendMail({
          from: '"Kosh Imperial" <orders@koshimperial.com>',
          to: user.email,
          subject,
          html,
        });
        logger.info(`[EmailService] Sent confirmation to ${user.email}`);
        return { success: true, mode: 'real' };
      } catch (err) {
        logger.error('[EmailService] Failed to send email via SMTP:', err.message);
      }
    }

    // Fallback: log to console
    logger.info(`[EmailService Mock] Order confirmation simulated for ${user.email} (Order ${order.orderNumber})`);
    return { success: true, mode: 'mock' };
  }

  async sendLowStockNotification(product) {
    logger.warn(`[EmailService] Alert: Low stock detected for product ${product.name} (SKU: ${product.sku}, Remaining: ${product.stock})`);
    return { success: true };
  }
}

export const emailService = new EmailService();
