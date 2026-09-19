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

---

## 3. Monorepo File Structure

```
kosh-imperial/
├── client/                          # Customer storefront
├── admin/                           # Admin dashboard (separate app)
├── server/                          # Backend API
├── docs/
│   ├── README.md                    # this file
│   ├── design.md
│   └── MOCK_VS_REAL.md
└── package.json                     # npm workspaces root
```
