import { ApiResponse } from '../utils/apiResponse.js';

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return ApiResponse.error(res, 'Access denied. Administrator privileges required.', 403);
  }
  next();
};
