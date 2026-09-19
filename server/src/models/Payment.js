import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    gateway: {
      type: String,
      enum: ['phonepe', 'razorpay', 'stripe', 'mock'],
      required: true,
    },
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
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
