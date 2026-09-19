import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        variant: { name: String, option: String },
        quantity: { type: Number, required: true, min: 1 },
        priceAtAdd: { type: Number, required: true },
      },
    ],
    couponApplied: { type: Schema.Types.ObjectId, ref: 'Coupon' },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
