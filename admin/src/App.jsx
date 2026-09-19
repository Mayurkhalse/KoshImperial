import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Products } from './pages/Products.jsx';
import { Orders } from './pages/Orders.jsx';
import { Users } from './pages/Users.jsx';
import { Content } from './pages/Content.jsx';
import { Coupons } from './pages/Coupons.jsx';
import { Analytics } from './pages/Analytics.jsx';
import { Login } from './pages/Login.jsx';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('ki_admin_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="content" element={<Content />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
