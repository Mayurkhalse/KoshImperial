import Review from '../models/Review.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getProductReviews = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ product: id })
    .populate('user', 'name avatarUrl')
    .sort({ createdAt: -1 });

  return ApiResponse.success(res, reviews);
};

export const createReview = async (req, res) => {
  const { id: productId } = req.params;
  const { rating, title, comment, images } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return ApiResponse.error(res, 'Product not found', 404);
  }

  // Check verified purchase
  const verifiedOrder = await Order.findOne({
    user: req.user._id,
    'items.product': productId,
    status: { $in: ['delivered', 'confirmed'] },
  });

  const review = await Review.create({
    product: productId,
    user: req.user._id,
    rating: Number(rating),
    title,
    comment,
    images: images || [],
    isVerifiedPurchase: Boolean(verifiedOrder),
  });

  // Recalculate product rating stats
  const allReviews = await Review.find({ product: productId });
  const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
  product.ratingsCount = allReviews.length;
  product.ratingsAverage = Number((totalRating / allReviews.length).toFixed(1));
  await product.save();

  return ApiResponse.success(res, review, 'Review submitted successfully', 201);
};
