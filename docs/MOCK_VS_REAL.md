# Kosh Imperial — Subsystems Architecture: Mock vs. Real Reference

This document provides a comprehensive breakdown of all subsystems in the Kosh Imperial platform, detailing which services have real implementations, which have mock/fallback implementations, why each exists, and how to switch between them.

---

## Subsystems Summary Matrix

| Subsystem | Mode Available | Real Provider | Mock / Fallback Behavior | Configuration Trigger |
|---|---|---|---|---|
| **Payment Gateway** | Real + Mock | **PhonePe PG Checkout API** (UAT & Prod) with SHA-256 `X-VERIFY` signatures & checksum calculation | **MockPaymentGateway**: Simulates successful/failed checkout with instant callback, merchant transaction ID generation, and audit logging | `ACTIVE_PAYMENT_GATEWAY=phonepe` vs `ACTIVE_PAYMENT_GATEWAY=mock` in `server/.env` |
| **Database & Persistence** | Real + In-Memory Fallback | **MongoDB (Mongoose)** connecting to local Mongo or MongoDB Atlas | In-memory simulated state & database seeder with pre-built catalogs and accounts | `MONGO_URI` in `server/.env` |
| **Product Media Storage** | Real + Local Fallback | **Cloudinary CDN** via Multer memory storage stream | Serves high-resolution curated plantable/sustainable wallet imagery bundled locally and via public CDN URLs | `CLOUDINARY_CLOUD_NAME` set vs left blank |
| **Transactional Email** | Real + Console/Ethereal | **Nodemailer (SMTP / SendGrid / Resend)** | Records transactional email HTML & recipient info to console/log without crashing | `EMAIL_SERVICE_API_KEY` set vs left blank |
| **Authentication** | Real | **JWT (Access 15m + Refresh 7d httpOnly)** with **bcryptjs** password encryption | Built-in seed accounts (`admin@koshimperial.com`, `customer@koshimperial.com`) for one-click testing | Always active |
| **OAuth 2.0** | Real + Dev Bypass | **Passport.js Google OAuth 2.0** strategy | One-click mock Google profile login for development environments without Google Client credentials | Google credentials configured vs omitted |
| **Scheduled Jobs** | Real | **node-cron** | Runs scheduled tasks in background for abandoned carts and low stock alerts | Active on server boot |
| **Storefront CMS** | Real | **PageContent collection (Mongoose)** | Pre-seeded with full brand copy and editable in Admin `PageContentEditor` | Backed by Mongo `/api/content` |

---

## Detailed Subsystem Breakdown

### 1. Payment Gateway (Adapter Pattern)

#### Real Implementation: PhonePe PG Checkout
- **Location**: `server/src/services/payment/PhonePeGateway.js`
- **Interface**: Inherits from `PaymentGateway.interface.js` (`initiate`, `verifyCallback`, `checkStatus`).
- **Mechanism**:
  1. Computes Base64 payload of transaction details (amount in paise, orderId, callbackUrl, redirectUrl).
  2. Generates `X-VERIFY` header: `SHA256(base64Payload + "/pg/v1/pay" + saltKey) + "###" + saltIndex`.
  3. Sends request to PhonePe endpoint (`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay` for UAT).
  4. Returns payment redirect URL to client.
  5. Webhook listener verifies `X-VERIFY` response checksum before updating `Payment` and `Order` records.

#### Mock Implementation: `MockPaymentGateway.js`
- **Location**: `server/src/services/payment/MockPaymentGateway.js`
- **Why it exists**: Enables frictionless development, automated testing, and customer checkout demonstration without requiring an active PhonePe merchant ID and bank account.
- **Behavior**:
  1. Generates realistic `MOCK-TXN-${Date.now()}` IDs.
  2. Automatically completes the checkout flow or redirects to a simulated success state.
  3. Emits audit logs and updates the order status to `confirmed`.
- **How to Switch**:
  ```env
  # server/.env
  ACTIVE_PAYMENT_GATEWAY=mock       # For offline/local simulated testing
  # ACTIVE_PAYMENT_GATEWAY=phonepe  # For live or sandbox PhonePe PG
  ```

---

### 2. Media & Image Uploads

#### Real Implementation: Cloudinary
- **Location**: `server/src/config/cloudinary.js` & `server/src/middleware/upload.middleware.js`
- **Mechanism**: Multer buffers file uploads into memory; Cloudinary `upload_stream` pushes images to the Cloudinary CDN and stores the secure URL in the `Product.images` array.

#### Fallback Implementation:
- If `CLOUDINARY_CLOUD_NAME` is empty or invalid, the upload middleware falls back to saving uploads into `server/public/uploads` and serving them statically, while pre-seeded products use high-resolution sustainable lifestyle images.

---

### 3. Email Notification Service

#### Real Implementation: Nodemailer
- **Location**: `server/src/services/email.service.js`
- **Mechanism**: Configured to send order confirmations and password reset links via standard SMTP, SendGrid, or Resend.

#### Mock / Fallback:
- When no API keys or SMTP credentials are provided, `email.service.js` prints a stylized debug summary of the email to the console and returns `{ success: true, mocked: true }`, ensuring test orders complete smoothly without throwing network timeouts.

---

### 4. Admin Dashboard CMS (PageContent)

- **Real & Live**: Unlike hardcoded landing page copy, the hero headline, our story copy, sustainability details, and FAQs are stored in the MongoDB `PageContent` collection.
- The Admin Dashboard features an interactive `PageContentEditor.jsx` that makes real `PUT /api/admin/content/:pageKey` calls to update customer-facing marketing copy live without needing a redeployment.
