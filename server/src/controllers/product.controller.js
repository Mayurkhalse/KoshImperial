import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { processImageUpload } from '../middleware/upload.middleware.js';

export const getProducts = async (req, res) => {
  const {
    category,
    sort,
    page = 1,
    limit = 12,
    search,
    featured,
    minPrice,
    maxPrice,
  } = req.query;

  const query = { isActive: true };

  if (category) {
    const cat = await Category.findOne({ slug: category });
    if (cat) query.category = cat._id;
  }

  if (featured === 'true') {
    query.isFeatured = true;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { materials: { $in: [new RegExp(search, 'i')] } },
      { sustainabilityTags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  let sortOption = { createdAt: -1 };
  if (sort === 'price-low') sortOption = { price: 1 };
  if (sort === 'price-high') sortOption = { price: -1 };
  if (sort === 'rating') sortOption = { ratingsAverage: -1 };
  if (sort === 'featured') sortOption = { isFeatured: -1, createdAt: -1 };

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum),
    Product.countDocuments(query),
  ]);

  return ApiResponse.success(res, {
    products,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    },
  });
};

export const getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug, isActive: true }).populate('category', 'name slug');

  if (!product) {
    return ApiResponse.error(res, 'Product not found', 404);
  }

  return ApiResponse.success(res, product);
};

export const createProduct = async (req, res) => {
  const body = { ...req.body };

  // Parse JSON fields if multipart form data sent
  if (typeof body.variants === 'string') {
    try {
      body.variants = JSON.parse(body.variants);
    } catch {
      body.variants = [];
    }
  }
  if (typeof body.materials === 'string') {
    try {
      body.materials = JSON.parse(body.materials);
    } catch {
      body.materials = body.materials.split(',').map((s) => s.trim());
    }
  }
  if (typeof body.sustainabilityTags === 'string') {
    try {
      body.sustainabilityTags = JSON.parse(body.sustainabilityTags);
    } catch {
      body.sustainabilityTags = body.sustainabilityTags.split(',').map((s) => s.trim());
    }
  }

  // Handle uploaded images if any
  if (req.files && req.files.length > 0) {
    body.images = [];
    for (const file of req.files) {
      const uploaded = await processImageUpload(file);
      if (uploaded) body.images.push(uploaded);
    }
  }

  // Generate slug if not provided
  if (!body.slug && body.name) {
    body.slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // Generate SKU if missing
  if (!body.sku) {
    body.sku = `KI-${Date.now().toString().slice(-6)}`;
  }

  const product = await Product.create(body);
  return ApiResponse.success(res, product, 'Product created successfully', 201);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };

  if (typeof body.variants === 'string') {
    try {
      body.variants = JSON.parse(body.variants);
    } catch {}
  }
  if (typeof body.materials === 'string') {
    try {
      body.materials = JSON.parse(body.materials);
    } catch {
      body.materials = body.materials.split(',').map((s) => s.trim());
    }
  }
  if (typeof body.sustainabilityTags === 'string') {
    try {
      body.sustainabilityTags = JSON.parse(body.sustainabilityTags);
    } catch {
      body.sustainabilityTags = body.sustainabilityTags.split(',').map((s) => s.trim());
    }
  }

  if (req.files && req.files.length > 0) {
    const newImages = [];
    for (const file of req.files) {
      const uploaded = await processImageUpload(file);
      if (uploaded) newImages.push(uploaded);
    }
    body.$push = { images: { $each: newImages } };
  }

  const updated = await Product.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!updated) {
    return ApiResponse.error(res, 'Product not found', 404);
  }

  return ApiResponse.success(res, updated, 'Product updated successfully');
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
  if (!product) {
    return ApiResponse.error(res, 'Product not found', 404);
  }
  return ApiResponse.success(res, null, 'Product archived successfully');
};
