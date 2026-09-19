import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useQuery } from '@tanstack/react-query';
import { orderService } from '../../services/orderService.js';
import { ProfileForm } from '../../components/account/ProfileForm.jsx';
import { OrderHistoryTable } from '../../components/account/OrderHistoryTable.jsx';
import { OrderDetailCard } from '../../components/account/OrderDetailCard.jsx';
import { AddressBook } from '../../components/account/AddressBook.jsx';
import { User, ShoppingBag, MapPin, LogOut } from 'lucide-react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs.jsx';
import { Button } from '../../components/common/Button.jsx';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses'
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data: ordersData, isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: () => orderService.getMyOrders(),
  });

  const orders = ordersData?.data || [];

  return (
    <div className="py-12 md:py-20 bg-milkglass-base min-h-screen">
      <div className="max-w-container mx-auto px-4 md:px-8 space-y-6">
        <Breadcrumbs items={[{ label: 'My Account' }]} />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-driftwood-300 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-mahogany-base">
              MY ACCOUNT
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl text-evergreen-700 font-normal">
              Welcome, {user?.name || 'Patron'}
            </h1>
          </div>

          <Button variant="secondary" size="sm" onClick={logout} className="flex items-center gap-2">
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </Button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Navigation Tabs (3 cols) */}
          <div className="lg:col-span-3 bg-milkglass-100 border border-driftwood-300 p-4 space-y-1 shadow-luxury">
            <button
              type="button"
              onClick={() => {
                setActiveTab('orders');
                setSelectedOrder(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-medium text-left transition-colors ${
                activeTab === 'orders'
                  ? 'bg-evergreen-700 text-milkglass-base font-semibold'
                  : 'text-evergreen-700 hover:bg-milkglass-300'
              }`}
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('addresses');
                setSelectedOrder(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-medium text-left transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-evergreen-700 text-milkglass-base font-semibold'
                  : 'text-evergreen-700 hover:bg-milkglass-300'
              }`}
            >
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Address Book</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('profile');
                setSelectedOrder(null);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-medium text-left transition-colors ${
                activeTab === 'profile'
                  ? 'bg-evergreen-700 text-milkglass-base font-semibold'
                  : 'text-evergreen-700 hover:bg-milkglass-300'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Profile Details</span>
            </button>
          </div>

          {/* Tab Content (9 cols) */}
          <div className="lg:col-span-9">
            {activeTab === 'orders' && (
              <div>
                {selectedOrder ? (
                  <OrderDetailCard
                    order={selectedOrder}
                    onBack={() => setSelectedOrder(null)}
                  />
                ) : (
                  <div className="space-y-6">
                    <h3 className="font-serif text-2xl text-evergreen-700 font-normal">
                      Order History
                    </h3>
                    <OrderHistoryTable
                      orders={orders}
                      onSelectOrder={(ord) => setSelectedOrder(ord)}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && <AddressBook />}

            {activeTab === 'profile' && <ProfileForm />}
          </div>
        </div>
      </div>
    </div>
  );
};
