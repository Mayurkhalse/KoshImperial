import React, { useState, useEffect } from 'react';
import api from '../services/api.js';
import { OrderTable } from '../components/orders/OrderTable.jsx';
import { OrderDetailPanel } from '../components/orders/OrderDetailPanel.jsx';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = () => {
    setIsLoading(true);
    const url = statusFilter ? `/admin/orders?status=${statusFilter}` : '/admin/orders';
    api
      .get(url)
      .then((res) => {
        setOrders(res.data?.data?.orders || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-mahogany-base font-semibold">
            FULFILLMENT & LEDGER
          </span>
          <h1 className="font-serif text-3xl text-evergreen-700 font-normal mt-1">
            Customer Orders
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-brown uppercase tracking-wider font-semibold">
            Filter:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-driftwood-base text-xs px-3 py-2 text-charcoal uppercase tracking-wider focus:outline-none focus:border-mahogany-base cursor-pointer"
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p className="text-xs uppercase tracking-widest text-muted-brown">Loading orders...</p>
      ) : (
        <OrderTable
          orders={orders}
          onSelectOrder={(ord) => setSelectedOrder(ord)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {selectedOrder && (
        <OrderDetailPanel order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};
