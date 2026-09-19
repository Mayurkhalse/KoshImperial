import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService.js';

export const useProducts = (params = {}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const res = await productService.getProducts(params);
      return res;
    },
    keepPreviousData: true,
  });
};

export const useProductDetail = (slug) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const res = await productService.getProductBySlug(slug);
      return res;
    },
    enabled: Boolean(slug),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await productService.getCategories();
      return res;
    },
  });
};
