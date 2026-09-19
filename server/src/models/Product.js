import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    shortDescription: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    images: [{ url: String, alt: String }],
    price: { type: Number, required: true },
    compareAtPrice: { type: Number }, // for strike-through pricing
    variants: [
      {
        name: String, // e.g. "Color"
        options: [String], // e.g. ["Evergreen", "Mahogany"]
      },
    ],
    materials: [{ type: String }], // "Cactus leather", "Plantable seed lining"
    sustainabilityTags: [{ type: String }], // "Biodegradable", "Vegan"
    sku: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    ratingsAverage: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
