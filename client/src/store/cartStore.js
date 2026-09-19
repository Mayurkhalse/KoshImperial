import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: { items: [] },
  summary: { subtotal: 0, discount: 0, shippingFee: 0, total: 0 },
  isDrawerOpen: false,
  isLoading: false,

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  setCartData: (data) => {
    if (!data) return;
    set({
      cart: data.cart || { items: [] },
      summary: data.summary || { subtotal: 0, discount: 0, shippingFee: 0, total: 0 },
    });
  },

  getItemCount: () => {
    const items = get().cart?.items || [];
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
