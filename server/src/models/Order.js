import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true }, // e.g. KI-2026-00123
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        name: String, // snapshot at time of order
        variant: { name: String, option: String },
        price: Number, // snapshot
        quantity: Number,
      },
    ],
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
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
