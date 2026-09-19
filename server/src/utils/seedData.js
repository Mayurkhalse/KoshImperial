import mongoose from 'mongoose';
import { env } from '../config/env.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import PageContent from '../models/PageContent.js';
import dns from 'node:dns';

// Fix for Windows & local ISP DNS dropping SRV queries (querySrv ECONNREFUSED)
try {
  dns.setServers(['8.8.8.8', '8.8.4.4']);
} catch {
  // Ignore in environments that disallow overriding DNS
}

export const seedDatabase = async () => {
  try {
    console.log('[Seeder] Connecting to MongoDB at:', env.MONGO_URI);
    await mongoose.connect(env.MONGO_URI);

    console.log('[Seeder] Clearing existing data...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Coupon.deleteMany({});
    await PageContent.deleteMany({});

    // 1. Create Default Users
    console.log('[Seeder] Creating admin and customer users...');
    const adminUser = await User.create({
      name: 'Kosh Imperial Admin',
      email: 'admin@koshimperial.com',
      password: 'AdminPassword123!',
      role: 'admin',
      isEmailVerified: true,
      phone: '+91 98765 43210',
    });

    const customerUser = await User.create({
      name: 'Aarav Sharma',
      email: 'customer@koshimperial.com',
      password: 'CustomerPassword123!',
      role: 'customer',
      isEmailVerified: true,
      phone: '+91 91234 56789',
    });

    // 2. Create Categories
    console.log('[Seeder] Creating product categories...');
    const walletsCat = await Category.create({
      name: 'Plantable Bi-Folds',
      slug: 'plantable-bi-folds',
      description: 'Handcrafted heirloom wallets infused with non-GMO wildflower seeds in the lining.',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
    });

    const cardholdersCat = await Category.create({
      name: 'Minimalist Cardholders',
      slug: 'minimalist-cardholders',
      description: 'Ultra-slim cactus leather card sleeves designed for effortless everyday pocket carry.',
      image: 'https://images.unsplash.com/photo-1606503829068-12e022f465a3?auto=format&fit=crop&q=80&w=800',
    });

    const accessoriesCat = await Category.create({
      name: 'Eco Travel & Passport Wallets',
      slug: 'eco-travel-passport-wallets',
      description: 'Spacious organic cork and plantable canvas travel wallets for conscious global explorers.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    });

    // 3. Create Products
    console.log('[Seeder] Creating sustainable luxury products...');
    const products = [
      {
        name: 'The Evergreen Accordion Artisan Bi-Fold',
        slug: 'the-evergreen-accordion-artisan-bi-fold',
        description: 'Our signature handcrafted silhouette crafted from organic nopal cactus leather in sage forest green. Features a distinctive pointed tongue closure strap that secures horizontally through an artisanal keeper loop, and opens to reveal multi-tier pleated accordion card organizer slots lined with living wildflower seed paper.',
        shortDescription: 'Signature sage cactus leather wallet with pointed strap closure and pleated accordion card organizer.',
        category: walletsCat._id,
        price: 3499,
        compareAtPrice: 4299,
        sku: 'KI-WLT-EVR-01',
        stock: 35,
        isFeatured: true,
        isActive: true,
        ratingsAverage: 4.9,
        ratingsCount: 38,
        materials: ['Organic Nopal Cactus Leather', 'Living Wildflower Seed Paper', 'Organic Cotton Thread'],
        sustainabilityTags: ['100% Biodegradable', 'Accordion Craft', 'Zero Toxic Tanning'],
        variants: [
          {
            name: 'Color',
            options: ['Sage Forest Green', 'Olive Driftwood', 'Charcoal Moss'],
          },
        ],
        images: [
          {
            url: '/images/products/kosh-evergreen-closed.jpg',
            alt: 'The Evergreen Accordion Artisan Bi-Fold with pointed tongue strap',
          },
          {
            url: '/images/products/kosh-evergreen-open.jpg',
            alt: 'The Evergreen Accordion Wallet open showing pleated card slots and seed paper',
          },
          {
            url: '/images/products/kosh-artisan-duo-hero.jpg',
            alt: 'The Evergreen Accordion Wallet on artisan workbench',
          },
        ],
      },
      {
        name: 'The Imperial Wine Croc-Embossed Tri-Fold',
        slug: 'the-imperial-wine-croc-embossed-tri-fold',
        description: 'Handcrafted from plant-based bio-leather with a deep burgundy wine crocodile embossed texture. Engineered with an elegant vertical tongue closure strap and sleek diagonal card slots with embedded chamomile and daisy seed lining.',
        shortDescription: 'Heirloom burgundy croc-embossed bio-leather wallet with vertical tongue strap and diagonal card slots.',
        category: walletsCat._id,
        price: 3899,
        compareAtPrice: 4699,
        sku: 'KI-WLT-IMP-02',
        stock: 25,
        isFeatured: true,
        isActive: true,
        ratingsAverage: 5.0,
        ratingsCount: 29,
        materials: ['Crocodile-Embossed Bio-Leather', 'Living Daisy Seed Paper', 'Organic Black Cotton'],
        sustainabilityTags: ['Croc-Embossed Plant Leather', 'Vertical Tongue Strap', 'Zero Toxic Tanning'],
        variants: [
          {
            name: 'Color',
            options: ['Imperial Burgundy Wine', 'Deep Mahogany', 'Obsidian Plum'],
          },
        ],
        images: [
          {
            url: '/images/products/kosh-imperial-closed.jpg',
            alt: 'The Imperial Wine Croc-Embossed Tri-Fold closed with strap on walnut',
          },
          {
            url: '/images/products/kosh-imperial-open.jpg',
            alt: 'The Imperial Wine Croc Tri-Fold open showing diagonal card slots and flap',
          },
          {
            url: '/images/products/kosh-artisan-duo-hero.jpg',
            alt: 'The Imperial Wine Croc Wallet in atelier setting',
          },
        ],
      },
      {
        name: 'The Sprout Minimalist Cardholder',
        slug: 'the-sprout-minimalist-cardholder',
        description: 'Precision hand-stitched 4-slot cardholder designed with a central cash slip. Engineered with plantable basil seed lining and supple apple peel leather for minimalists who value tactile refinement.',
        shortDescription: 'Ultra-slim 4-slot cardholder with embedded herbal seed lining.',
        category: cardholdersCat._id,
        price: 1999,
        compareAtPrice: 2499,
        sku: 'KI-CRD-SPR-03',
        stock: 50,
        isFeatured: true,
        isActive: true,
        ratingsAverage: 4.8,
        ratingsCount: 42,
        materials: ['Apple Peel Bio-Composite', 'Sweet Basil Seed Lining', 'Natural Vegetable Dye'],
        sustainabilityTags: ['Plantable Lining', 'Cruelty-Free', 'Carbon Negative'],
        variants: [
          {
            name: 'Color',
            options: ['Mahogany Brown', 'Milkglass Cream', 'Charcoal Bark'],
          },
        ],
        images: [
          {
            url: '/images/products/sprout-cardholder.jpg',
            alt: 'The Sprout Minimalist Cardholder on natural linen',
          },
          {
            url: '/images/products/kosh-evergreen-open.jpg',
            alt: 'The Sprout Minimalist Cardholder detail view',
          },
        ],
      },
      {
        name: 'The Driftwood Heirloom Passport Sleeve',
        slug: 'the-driftwood-heirloom-passport-sleeve',
        description: 'Tailored for the conscious voyager. Houses a passport, boarding passes, SIM cards, and 5 payment cards. Hand-finished with beeswax edging and embedded with lavender seeds.',
        shortDescription: 'Spacious eco-luxury travel wallet with lavender seed paper interior.',
        category: accessoriesCat._id,
        price: 4199,
        compareAtPrice: 4999,
        sku: 'KI-TRV-DRF-04',
        stock: 20,
        isFeatured: true,
        isActive: true,
        ratingsAverage: 5.0,
        ratingsCount: 19,
        materials: ['Sustainably Harvested Cork Leather', 'Organic Hemp Fabric', 'Lavender Seed Paper'],
        sustainabilityTags: ['Compostable', 'Water Resistant', 'Plastic-Free Packaging'],
        variants: [
          {
            name: 'Color',
            options: ['Driftwood Tan', 'Midnight Evergreen'],
          },
        ],
        images: [
          {
            url: '/images/products/driftwood-passport.jpg',
            alt: 'The Driftwood Heirloom Passport Sleeve with passport on dark oak',
          },
          {
            url: '/images/products/kosh-imperial-open.jpg',
            alt: 'The Driftwood Heirloom Passport Sleeve reverse view',
          },
        ],
      },
    ];

    await Product.insertMany(products);

    // 4. Create Coupons
    console.log('[Seeder] Creating promotional discount coupons...');
    await Coupon.create([
      {
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        minOrderValue: 1500,
        maxUses: 500,
        usedCount: 12,
        isActive: true,
      },
      {
        code: 'EARTHDAY20',
        type: 'percentage',
        value: 20,
        minOrderValue: 3000,
        maxUses: 200,
        usedCount: 45,
        isActive: true,
      },
      {
        code: 'KOSH500',
        type: 'flat',
        value: 500,
        minOrderValue: 3500,
        maxUses: 100,
        usedCount: 8,
        isActive: true,
      },
    ]);

    // 5. Create CMS Marketing Content
    console.log('[Seeder] Seeding CMS page content blocks...');
    await PageContent.create([
      {
        pageKey: 'home-hero',
        blocks: [
          { key: 'eyebrow', value: 'KOSH IMPERIAL — LUXURY ECO-CRAFT' },
          { key: 'heading', value: 'Wallets crafted with quiet luxury' },
          { key: 'accentWord', value: 'that can return.' },
          {
            key: 'subtext',
            value:
              'Meticulously handcrafted from regenerative plant fibers and infused with living wildflower seeds. Designed to age with distinction for decades, and nurture the soil when planted.',
          },
          { key: 'ctaLabel', value: 'Explore The Collection' },
          { key: 'ctaHref', value: '/shop' },
          {
            key: 'image',
            value: '/images/products/kosh-artisan-duo-hero.jpg',
          },
        ],
        updatedBy: adminUser._id,
      },
      {
        pageKey: 'our-story',
        blocks: [
          { key: 'eyebrow', value: 'OUR HERITAGE & VISION' },
          { key: 'heading', value: 'Rooted in timeless craftsmanship,' },
          { key: 'accentWord', value: 'inspired by the earth.' },
          {
            key: 'pullQuote',
            value:
              '"We set out to prove that the most luxurious leather goods on earth need not take anything from it."',
          },
          { key: 'founderName', value: 'Founders of Kosh Imperial' },
        ],
        updatedBy: adminUser._id,
      },
      {
        pageKey: 'sustainability',
        blocks: [
          { key: 'eyebrow', value: 'MATERIALS & REGENERATION' },
          { key: 'heading', value: 'Nature provides every stitch,' },
          { key: 'accentWord', value: 'seed, and fold.' },
          {
            key: 'description',
            value:
              'Our materials undergo zero toxic tanning. We utilize organic cactus leaf fibers, mycelium, and non-invasive wildflower seeds.',
          },
        ],
        updatedBy: adminUser._id,
      },
      {
        pageKey: 'impact',
        blocks: [
          { key: 'walletsPlanted', value: '14,820' },
          { key: 'wildflowersBloomed', value: '88,000+' },
          { key: 'wasteDivertedKg', value: '12,450' },
        ],
        updatedBy: adminUser._id,
      },
      {
        pageKey: 'faq',
        blocks: [
          {
            key: 'items',
            value: [
              {
                q: 'How does a plantable wallet actually work?',
                a: 'The inner structural lining of every Kosh Imperial wallet is woven with natural handmade paper embedded with non-GMO wildflower and botanical seeds. After years or decades of use, simply moisten the wallet, place it under potting soil, water it gently, and sprouts will emerge within 7–14 days.',
              },
              {
                q: 'Will the seeds germinate while I am carrying the wallet?',
                a: 'Not at all. Seeds require continuous moisture, soil nutrients, and sunlight to awaken. Daily pocket humidity or occasional raindrops will not trigger germination.',
              },
              {
                q: 'How durable is cactus and mycelium leather compared to animal hide?',
                a: 'Our plant-based bio-leathers are tested for over 100,000 flex cycles, offering comparable tensile strength, water resistance, and graceful patina development over time without cracking.',
              },
              {
                q: 'What is your shipping and return policy?',
                a: 'We offer complimentary express shipping across India on orders above ₹2,000. All unworn items in original seed-paper packaging can be returned within 14 days.',
              },
            ],
          },
        ],
        updatedBy: adminUser._id,
      },
    ]);

    console.log('[Seeder] Database seeding successfully completed!');
    process.exit(0);
  } catch (err) {
    console.error('[Seeder Error] Failed to seed database:', err);
    process.exit(1);
  }
};

// Auto-run if executed directly via node
if (process.argv[1]?.endsWith('seedData.js')) {
  seedDatabase();
}
