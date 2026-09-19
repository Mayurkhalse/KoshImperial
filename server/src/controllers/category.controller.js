import Category from '../models/Category.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getCategories = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  return ApiResponse.success(res, categories);
};

export const createCategory = async (req, res) => {
  const { name, description, image } = req.body;
  const slug = req.body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const category = await Category.create({ name, slug, description, image });
  return ApiResponse.success(res, category, 'Category created', 201);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
  if (!category) {
    return ApiResponse.error(res, 'Category not found', 404);
  }
  return ApiResponse.success(res, category, 'Category updated');
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  return ApiResponse.success(res, null, 'Category deleted');
};
