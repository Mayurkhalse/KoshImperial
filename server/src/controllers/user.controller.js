import User from '../models/User.js';
import Address from '../models/Address.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate('addresses');
  return ApiResponse.success(res, user);
};

export const updateProfile = async (req, res) => {
  const { name, phone, avatarUrl } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, phone, avatarUrl },
    { new: true, runValidators: true }
  );
  return ApiResponse.success(res, user, 'Profile updated');
};

export const getAddresses = async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });
  return ApiResponse.success(res, addresses);
};

export const addAddress = async (req, res) => {
  const addressData = { ...req.body, user: req.user._id };

  if (addressData.isDefault) {
    await Address.updateMany({ user: req.user._id }, { isDefault: false });
  }

  const address = await Address.create(addressData);
  await User.findByIdAndUpdate(req.user._id, { $push: { addresses: address._id } });

  return ApiResponse.success(res, address, 'Address added', 201);
};

export const updateAddress = async (req, res) => {
  const { id } = req.params;

  if (req.body.isDefault) {
    await Address.updateMany({ user: req.user._id }, { isDefault: false });
  }

  const address = await Address.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    { new: true }
  );

  if (!address) {
    return ApiResponse.error(res, 'Address not found', 404);
  }

  return ApiResponse.success(res, address, 'Address updated');
};

export const deleteAddress = async (req, res) => {
  const { id } = req.params;
  await Address.findOneAndDelete({ _id: id, user: req.user._id });
  await User.findByIdAndUpdate(req.user._id, { $pull: { addresses: id } });
  return ApiResponse.success(res, null, 'Address removed');
};

export const getAllUsers = async (req, res) => {
  const { search, role, page = 1, limit = 20 } = req.query;
  const query = {};

  if (role) query.role = role;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;

  const [users, total] = await Promise.all([
    User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    User.countDocuments(query),
  ]);

  return ApiResponse.success(res, {
    users,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
    },
  });
};
