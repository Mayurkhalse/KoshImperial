# Kosh Imperial — E-commerce & Promotional Website

**Technical README — Architecture, File Structure & Backend Specification**

---

## 1. Brand Context (for engineering reference)

| Field | Detail |
|---|---|
| Brand | Kosh Imperial |
| Category | Premium sustainable lifestyle — biodegradable/plantable wallets |
| Audience | 18–40, students → young professionals, eco-conscious, design-literate |
| Tone | Confident, refined, honest — never preachy about sustainability |
| Site type | Promotional + full e-commerce store |
| Core sections | Hero · Our Story · Sustainability & Materials · Product Collection · Why Choose Kosh Imperial · Impact & Environmental Commitment · FAQs · Contact |

This document assumes the design tokens defined in `design.md` (colors, type, spacing) are already implemented as a Tailwind theme — this file focuses on **structure and code architecture**, not visuals.

---

## 2. Tech Stack

### Frontend (Storefront)
- **React 18 + Vite** — build tooling
- **Tailwind CSS** — utility-first styling, themed via `tailwind.config.js`
- **React Router v6** — routing
- **Zustand** — lightweight global state (cart, auth, UI)
- **TanStack Query (React Query)** — server state, caching, product/order fetching
- **Axios** — HTTP client with interceptors for auth tokens
- **React Hook Form + Zod** — forms and validation
- **Framer Motion** — scroll reveals, hover states, page transitions
- **React Helmet Async** — SEO meta tags per page

### Admin Dashboard
- Separate **React + Vite** app (isolated build, shared design tokens), protected behind admin auth
- **Recharts** — analytics charts
- **TanStack Table** — data grids for products/orders/users

### Backend
- **Node.js + Express.js** — REST API
- **MongoDB + Mongoose** — primary datastore
- **JWT** — session tokens (access + refresh)
- **Passport.js** (`passport-google-oauth20`) — Google OAuth
- **bcrypt** — password hashing
- **Multer + Cloudinary** — product image upload & CDN delivery
- **Nodemailer** — transactional email (order confirmation, password reset)
- **Zod/Joi** — request validation middleware
- **node-cron** — scheduled jobs (abandoned cart emails, low-stock alerts)

### Payments
- Gateway **not finalized** — designed as a **pluggable adapter pattern**.
- Primary candidate: **PhonePe** (PG Checkout / Payment Gateway API)
- Architecture supports adding Razorpay/Stripe later without touching order logic (see §8).

### Infra (suggested)
| Layer | Service |
|---|---|
| Frontend hosting | Vercel / Netlify |
| Admin hosting | Vercel (separate project) |
| API hosting | Render / Railway |
| Database | MongoDB Atlas |
| Images | Cloudinary |
| Email | Resend / SendGrid via Nodemailer |
| Domain/DNS | Cloudflare |

---

## 3. Monorepo File Structure

```
kosh-imperial/
├── client/                          # Customer storefront
│   ├── public/
│   │   ├── favicon.svg
│   │   └── robots.txt
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/                # SVG icon set (leaf, sprout, heart, shield)
│   │   │   └── fonts/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── IconButton.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   └── Accordion.jsx     # used in FAQ
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── NavLinks.jsx
│   │   │   │   ├── MobileMenu.jsx
│   │   │   │   ├── AnnouncementBar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── home/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── BrandStatement.jsx
│   │   │   │   ├── FeaturedCollection.jsx
│   │   │   │   ├── TrustBadgeStrip.jsx   # "Sustainable materials / Crafted with purpose"
│   │   │   │   └── ImpactStrip.jsx
│   │   │   ├── product/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductFilterBar.jsx
│   │   │   │   ├── ProductGallery.jsx
│   │   │   │   ├── ProductInfoPanel.jsx
│   │   │   │   ├── SizeMaterialSelector.jsx
│   │   │   │   └── ReviewSection.jsx
│   │   │   ├── cart/
│   │   │   │   ├── CartDrawer.jsx
│   │   │   │   ├── CartItem.jsx
│   │   │   │   └── CartSummary.jsx
│   │   │   ├── checkout/
│   │   │   │   ├── CheckoutSteps.jsx
│   │   │   │   ├── AddressForm.jsx
│   │   │   │   ├── PaymentSelector.jsx
│   │   │   │   └── OrderSummary.jsx
│   │   │   ├── account/
│   │   │   │   ├── ProfileForm.jsx
│   │   │   │   ├── OrderHistoryTable.jsx
│   │   │   │   ├── OrderDetailCard.jsx
│   │   │   │   └── AddressBook.jsx
│   │   │   ├── sustainability/
│   │   │   │   ├── MaterialsSection.jsx
│   │   │   │   ├── ImpactCounter.jsx      # animated stat counters
│   │   │   │   └── ProcessTimeline.jsx
│   │   │   ├── story/
│   │   │   │   ├── StoryHero.jsx
│   │   │   │   ├── FounderNote.jsx
│   │   │   │   └── Milestones.jsx
│   │   │   └── shared/
│   │   │       ├── SectionHeading.jsx     # eyebrow + serif H2 + italic accent
│   │   │       ├── Divider.jsx
│   │   │       ├── IconTextCard.jsx
│   │   │       └── CTAButton.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Shop.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── OurStory.jsx
│   │   │   ├── Sustainability.jsx
│   │   │   ├── WhyKosh.jsx
│   │   │   ├── Impact.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderConfirmation.jsx
│   │   │   ├── account/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   └── Addresses.jsx
│   │   │   └── NotFound.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   ├── useProducts.js
│   │   │   ├── useDebounce.js
│   │   │   └── useScrollReveal.js
│   │   ├── context/
│   │   │   └── AuthProvider.jsx
│   │   ├── store/
│   │   │   ├── cartStore.js           # Zustand
│   │   │   ├── authStore.js
│   │   │   └── uiStore.js
│   │   ├── services/
│   │   │   ├── api.js                 # Axios instance + interceptors
│   │   │   ├── productService.js
│   │   │   ├── cartService.js
│   │   │   ├── orderService.js
│   │   │   ├── authService.js
│   │   │   ├── paymentService.js
│   │   │   └── contentService.js      # fetches CMS-lite page content
│   │   ├── utils/
│   │   │   ├── formatCurrency.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   ├── styles/
│   │   │   └── globals.css            # Tailwind directives + font-face
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── router.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── admin/                            # Admin dashboard (separate app)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Topbar.jsx
│   │   │   │   └── AdminLayout.jsx
│   │   │   ├── products/
│   │   │   │   ├── ProductTable.jsx
│   │   │   │   ├── ProductForm.jsx
│   │   │   │   └── InventoryBadge.jsx
│   │   │   ├── orders/
│   │   │   │   ├── OrderTable.jsx
│   │   │   │   ├── OrderDetailPanel.jsx
│   │   │   │   └── StatusUpdater.jsx
│   │   │   ├── users/
│   │   │   │   └── UserTable.jsx
│   │   │   ├── content/
│   │   │   │   └── PageContentEditor.jsx  # edits Our Story / Sustainability copy+images
│   │   │   ├── coupons/
│   │   │   │   ├── CouponTable.jsx
│   │   │   │   └── CouponForm.jsx
│   │   │   └── analytics/
│   │   │       ├── SalesChart.jsx
│   │   │       ├── RevenueCard.jsx
│   │   │       └── TopProductsList.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Content.jsx
│   │   │   ├── Coupons.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Login.jsx
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── server/                           # Backend API
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # Mongoose connection
│   │   │   ├── cloudinary.js
│   │   │   ├── passport.js           # Google OAuth strategy
│   │   │   └── env.js                # validated env loader
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Category.js
│   │   │   ├── Order.js
│   │   │   ├── Cart.js
│   │   │   ├── Address.js
│   │   │   ├── Coupon.js
│   │   │   ├── Review.js
│   │   │   ├── PageContent.js
│   │   │   └── Payment.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── category.controller.js
│   │   │   ├── order.controller.js
│   │   │   ├── cart.controller.js
│   │   │   ├── payment.controller.js
│   │   │   ├── user.controller.js
│   │   │   ├── review.controller.js
│   │   │   ├── coupon.controller.js
│   │   │   └── content.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── category.routes.js
│   │   │   ├── order.routes.js
│   │   │   ├── cart.routes.js
│   │   │   ├── payment.routes.js
│   │   │   ├── user.routes.js
│   │   │   ├── review.routes.js
│   │   │   ├── coupon.routes.js
│   │   │   ├── content.routes.js
│   │   │   └── admin.routes.js       # aggregates admin-only sub-routes
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js        # verifyJWT
│   │   │   ├── isAdmin.middleware.js
│   │   │   ├── errorHandler.middleware.js
│   │   │   ├── upload.middleware.js      # Multer memory storage → Cloudinary
│   │   │   └── validate.middleware.js    # Zod schema wrapper
│   │   ├── services/
│   │   │   ├── payment/
│   │   │   │   ├── PaymentGateway.interface.js
│   │   │   │   ├── PhonePeGateway.js
│   │   │   │   ├── RazorpayGateway.js    # future
│   │   │   │   └── paymentFactory.js
│   │   │   ├── email.service.js
│   │   │   ├── inventory.service.js
│   │   │   └── analytics.service.js
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   ├── apiResponse.js
│   │   │   ├── asyncHandler.js
│   │   │   └── logger.js
│   │   ├── jobs/
│   │   │   ├── abandonedCart.cron.js
│   │   │   └── lowStockAlert.cron.js
│   │   ├── app.js                    # Express app config (middleware, routes mount)
│   │   └── server.js                 # entry point
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── README.md                     # this file
│   └── design.md
│
└── package.json                      # npm workspaces root
```

---

## 4. Frontend Component Architecture (key components)

| Component | Responsibility | Key Props |
|---|---|---|
| `Hero.jsx` | Full-bleed hero with eyebrow label, serif headline w/ italic accent word, subtext, primary CTA, floating trust badges | `heading`, `accentWord`, `subtext`, `ctaLabel`, `ctaHref`, `image` |
| `SectionHeading.jsx` | Reusable eyebrow + heading + italic accent pattern used across Story/Sustainability/Impact | `eyebrow`, `title`, `accent` |
| `ProductCard.jsx` | Grid tile — image, name, price, quick view | `product`, `onQuickView` |
| `ProductGallery.jsx` | PDP image carousel with thumbnail rail | `images[]` |
| `CartDrawer.jsx` | Slide-in cart, reads from `cartStore` | none (global state) |
| `CheckoutSteps.jsx` | Stepper: Address → Payment → Review | `activeStep` |
| `PaymentSelector.jsx` | Renders available gateways from `/api/payments/methods`; abstracted so PhonePe/Razorpay/Stripe show interchangeably | `methods[]`, `onSelect` |
| `ImpactCounter.jsx` | Animated count-up (e.g., "12,400 wallets planted") triggered on scroll-into-view | `endValue`, `label`, `icon` |
| `TrustBadgeStrip.jsx` | Small pill badges over hero image ("Sustainable materials", "Crafted with purpose") | `badges[]` |
| `PageContentEditor.jsx` (admin) | WYSIWYG-lite editor writing to `PageContent` collection so marketing copy is editable without redeploy | `pageKey` |

### State Management Split
- **Server state** (products, orders, content) → **TanStack Query** (cache, refetch, optimistic updates)
- **Client/UI state** (cart contents, drawer open/close, auth token, theme) → **Zustand stores**
- **Form state** → **React Hook Form**, validated with **Zod** schemas shared conceptually with backend validation shapes

---

## 5. Backend Data Models (Mongoose Schemas)

### `User.js`
```js
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, select: false }, // null if OAuth-only
  googleId: { type: String, unique: true, sparse: true },
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  phone: { type: String },
  avatarUrl: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  refreshToken: { type: String, select: false },
}, { timestamps: true });
```

### `Product.js`
```js
const productSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  images: [{ url: String, alt: String }],
  price: { type: Number, required: true },
  compareAtPrice: { type: Number }, // for strike-through pricing
  variants: [{
    name: String,          // e.g. "Color"
    options: [String],     // e.g. ["Evergreen", "Mahogany"]
  }],
  materials: [{ type: String }],       // "Cactus leather", "Plantable seed lining"
  sustainabilityTags: [{ type: String }], // "Biodegradable", "Vegan"
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  ratingsAverage: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
}, { timestamps: true });
```

### `Category.js`
```js
const categorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  image: String,
}, { timestamps: true });
```

### `Cart.js`
```js
const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    variant: { name: String, option: String },
    quantity: { type: Number, required: true, min: 1 },
    priceAtAdd: { type: Number, required: true },
  }],
  couponApplied: { type: Schema.Types.ObjectId, ref: 'Coupon' },
}, { timestamps: true });
```

### `Address.js`
```js
const addressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: String,
  phone: String,
  line1: String,
  line2: String,
  city: String,
  state: String,
  pincode: String,
  country: { type: String, default: 'India' },
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });
```

### `Order.js`
```js
const orderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true }, // e.g. KI-2026-00123
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    name: String,          // snapshot at time of order
    variant: { name: String, option: String },
    price: Number,         // snapshot
    quantity: Number,
  }],
  shippingAddress: { type: Schema.Types.Mixed, required: true }, // snapshot copy
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  total: { type: Number, required: true },
  couponCode: { type: String },
  payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending',
  },
  statusHistory: [{ status: String, at: { type: Date, default: Date.now } }],
  trackingNumber: String,
  courierPartner: String,
}, { timestamps: true });
```

### `Payment.js`
```js
const paymentSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  gateway: { type: String, enum: ['phonepe', 'razorpay', 'stripe'], required: true },
  gatewayTransactionId: { type: String },
  merchantTransactionId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: {
    type: String,
    enum: ['initiated', 'pending', 'success', 'failed', 'refunded'],
    default: 'initiated',
  },
  rawResponse: { type: Schema.Types.Mixed }, // full gateway callback payload for audit
}, { timestamps: true });
```

### `Coupon.js`
```js
const couponSchema = new Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, enum: ['percentage', 'flat'], required: true },
  value: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  maxUses: { type: Number },
  usedCount: { type: Number, default: 0 },
  expiresAt: { type: Date },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
```

### `Review.js`
```js
const reviewSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  title: String,
  comment: String,
  isVerifiedPurchase: { type: Boolean, default: false },
  images: [String],
}, { timestamps: true });
```

### `PageContent.js` (CMS-lite for marketing sections)
```js
const pageContentSchema = new Schema({
  pageKey: { type: String, required: true, unique: true }, // 'home-hero', 'our-story', 'sustainability', 'impact', 'faq'
  blocks: [{
    key: String,          // 'heading', 'subtext', 'ctaLabel', 'image'
    value: Schema.Types.Mixed,
  }],
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
```

---

## 6. API Endpoint Reference

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Email/password signup |
| POST | `/api/auth/login` | Public | Email/password login → JWT pair |
| GET | `/api/auth/google` | Public | Redirect to Google OAuth |
| GET | `/api/auth/google/callback` | Public | OAuth callback → issues JWT |
| POST | `/api/auth/refresh` | Public (refresh cookie) | Issue new access token |
| POST | `/api/auth/logout` | Private | Invalidate refresh token |

### Products
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/products` | Public | List with filters (`?category=&sort=&page=`) |
| GET | `/api/products/:slug` | Public | Single product detail |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Soft-delete (isActive=false) |

### Cart
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/cart` | Private | Get current user's cart |
| POST | `/api/cart/items` | Private | Add item |
| PUT | `/api/cart/items/:itemId` | Private | Update quantity |
| DELETE | `/api/cart/items/:itemId` | Private | Remove item |
| POST | `/api/cart/apply-coupon` | Private | Apply coupon code |

### Orders
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/orders` | Private | Create order from cart (pre-payment) |
| GET | `/api/orders/my` | Private | Current user's order history |
| GET | `/api/orders/:id` | Private/Admin | Order detail |
| GET | `/api/admin/orders` | Admin | All orders, filterable by status |
| PATCH | `/api/admin/orders/:id/status` | Admin | Update fulfillment status |

### Payments
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/payments/methods` | Public | List active gateways (dynamic, so UI never hardcodes PhonePe) |
| POST | `/api/payments/initiate` | Private | Create gateway transaction, return redirect/checkout payload |
| POST | `/api/payments/webhook/:gateway` | Public (signature-verified) | Gateway server-to-server callback |
| GET | `/api/payments/status/:merchantTransactionId` | Private | Poll payment status |

### Users / Account
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users/me` | Private | Profile |
| PUT | `/api/users/me` | Private | Update profile |
| GET/POST/PUT/DELETE | `/api/users/me/addresses` | Private | Address book CRUD |
| GET | `/api/admin/users` | Admin | List all users |

### Content, Reviews, Coupons (admin-manageable)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/content/:pageKey` | Public | Fetch editable marketing copy |
| PUT | `/api/admin/content/:pageKey` | Admin | Update copy/images per section |
| POST | `/api/products/:id/reviews` | Private | Submit review |
| GET | `/api/admin/coupons` / POST / PUT / DELETE | Admin | Coupon CRUD |

---

## 7. Authentication Flow

1. **Email/Password**: bcrypt-hashed password stored; login issues short-lived **access token** (15 min, JWT) + long-lived **refresh token** (7 days, httpOnly cookie).
2. **Google OAuth**: Passport `google-oauth20` strategy → on callback, find-or-create `User` by `googleId`/email → issue same JWT pair, keeping auth logic unified downstream.
3. `auth.middleware.js` verifies access token on protected routes; expired tokens trigger silent refresh via `/api/auth/refresh` (Axios interceptor in `services/api.js`).
4. `isAdmin.middleware.js` checks `role === 'admin'` for all `/api/admin/*` routes.

---

## 8. Payment Gateway Abstraction

Since the gateway (PhonePe vs. alternatives) isn't finalized, the backend defines a common interface so the choice is a **config change, not a rewrite**:

```js
// PaymentGateway.interface.js
class PaymentGateway {
  async initiate({ amount, orderId, userId }) { throw new Error('Not implemented'); }
  async verifyCallback(payload, headers) { throw new Error('Not implemented'); }
  async checkStatus(merchantTransactionId) { throw new Error('Not implemented'); }
}
```

`PhonePeGateway.js` implements this using PhonePe's PG Checkout API (X-VERIFY header signing, redirect URL flow). `paymentFactory.js` returns the active implementation based on `process.env.ACTIVE_PAYMENT_GATEWAY`, so `payment.controller.js` never references PhonePe directly — swapping to Razorpay/Stripe later means adding one new class and flipping an env var.

---

## 9. Admin Dashboard Scope

Full dashboard as requested, covering:
- **Dashboard**: revenue snapshot, orders today, low-stock alerts, top products
- **Products**: create/edit/archive, image upload, variant & material/sustainability-tag management, stock levels
- **Orders**: view, filter by status, update fulfillment status, view payment record
- **Users**: view customer list, order count, basic support lookup
- **Content**: edit Hero copy, Our Story text, Sustainability section, FAQ entries — writes to `PageContent` collection, no redeploy needed
- **Coupons**: create/manage discount codes
- **Analytics**: sales over time, category breakdown, repeat customer rate

Access restricted via `role: 'admin'` + separate login route (`admin/pages/Login.jsx` hits the same `/api/auth/login`, then checks role client-side and server-side).

---

## 10. Environment Variables (`server/.env.example`)

```
PORT=5000
MONGO_URI=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_SERVICE_API_KEY=
ACTIVE_PAYMENT_GATEWAY=phonepe
PHONEPE_MERCHANT_ID=
PHONEPE_SALT_KEY=
PHONEPE_SALT_INDEX=
PHONEPE_ENV=UAT
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

---

## 11. Local Setup

```bash
# root
npm install                      # installs workspace tooling

# server
cd server && npm install && npm run dev

# client (storefront)
cd client && npm install && npm run dev

# admin
cd admin && npm install && npm run dev
```

---

## 12. Non-Functional Requirements

- **Performance**: image lazy-loading, Cloudinary auto-format/quality, code-splitting per route (`React.lazy`)
- **SEO**: server-rendered meta via React Helmet, semantic HTML, sitemap.xml, structured data (Product schema.org)
- **Mobile-first**: all components built at 375px baseline first, then scaled up via Tailwind breakpoints
- **Security**: helmet.js, rate limiting on auth/payment routes, input sanitization, CORS locked to known origins
- **Testing**: Vitest + React Testing Library (frontend), Jest + Supertest (API)
