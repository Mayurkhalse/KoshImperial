import Product from '../models/Product.js';

export const deductStock = async (items) => {
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new Error(`Product ${item.product} not found during inventory deduction`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product.name}`);
    }
    product.stock -= item.quantity;
    await product.save();
  }
};

export const restoreStock = async (items) => {
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock += item.quantity;
      await product.save();
    }
  }
};
