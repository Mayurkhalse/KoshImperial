import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../services/cartService.js';
import { useCartStore } from '../store/cartStore.js';
import { useUIStore } from '../store/uiStore.js';
import { useAuthStore } from '../store/authStore.js';

export const useCart = () => {
  const queryClient = useQueryClient();
  const { setCartData, openDrawer } = useCartStore();
  const { addToast } = useUIStore();
  const { isAuthenticated } = useAuthStore();

  const cartQuery = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await cartService.getCart();
      setCartData(res.data);
      return res.data;
    },
    enabled: isAuthenticated,
  });

  const addItemMutation = useMutation({
    mutationFn: ({ productId, variant, quantity }) =>
      cartService.addItem(productId, variant, quantity),
    onSuccess: (res) => {
      setCartData(res.data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      addToast('Item added to your conscious collection', 'success');
      openDrawer();
    },
    onError: (err) => {
      addToast(err.response?.data?.message || 'Could not add item to cart', 'error');
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ itemId, quantity }) => cartService.updateQuantity(itemId, quantity),
    onSuccess: (res) => {
      setCartData(res.data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: (itemId) => cartService.removeItem(itemId),
    onSuccess: (res) => {
      setCartData(res.data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      addToast('Item removed from cart', 'info');
    },
  });

  const applyCouponMutation = useMutation({
    mutationFn: (code) => cartService.applyCoupon(code),
    onSuccess: (res) => {
      setCartData(res.data);
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      addToast('Coupon code applied!', 'success');
    },
    onError: (err) => {
      addToast(err.response?.data?.message || 'Invalid coupon code', 'error');
    },
  });

  return {
    cart: cartQuery.data?.cart,
    summary: cartQuery.data?.summary,
    isLoading: cartQuery.isLoading,
    addItem: addItemMutation.mutate,
    isAdding: addItemMutation.isPending,
    updateQuantity: updateQuantityMutation.mutate,
    removeItem: removeItemMutation.mutate,
    applyCoupon: applyCouponMutation.mutate,
    isApplyingCoupon: applyCouponMutation.isPending,
  };
};
