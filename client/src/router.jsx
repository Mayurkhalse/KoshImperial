import React from 'react';
import { createBrowserRouter, Outlet, ScrollRestoration } from 'react-router-dom';

import { AnnouncementBar } from './components/layout/AnnouncementBar.jsx';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CartDrawer } from './components/cart/CartDrawer.jsx';
import { ToastContainer } from './components/common/Toast.jsx';
import { ScrollToTop } from './components/common/ScrollToTop.jsx';

import { Home } from './pages/Home.jsx';
import { Shop } from './pages/Shop.jsx';
import { ProductDetail } from './pages/ProductDetail.jsx';
import { OurStory } from './pages/OurStory.jsx';
import { Sustainability } from './pages/Sustainability.jsx';
import { WhyKosh } from './pages/WhyKosh.jsx';
import { Impact } from './pages/Impact.jsx';
import { FAQ } from './pages/FAQ.jsx';
import { Contact } from './pages/Contact.jsx';
import { Cart } from './pages/Cart.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { OrderConfirmation } from './pages/OrderConfirmation.jsx';
import { NotFound } from './pages/NotFound.jsx';

import { Login } from './pages/account/Login.jsx';
import { Register } from './pages/account/Register.jsx';
import { Dashboard } from './pages/account/Dashboard.jsx';
import { Orders } from './pages/account/Orders.jsx';
import { Addresses } from './pages/account/Addresses.jsx';

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollRestoration />
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'product/:slug', element: <ProductDetail /> },
      { path: 'story', element: <OurStory /> },
      { path: 'sustainability', element: <Sustainability /> },
      { path: 'why-kosh', element: <WhyKosh /> },
      { path: 'impact', element: <Impact /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'order-confirmation', element: <OrderConfirmation /> },
      { path: 'account/login', element: <Login /> },
      { path: 'account/register', element: <Register /> },
      { path: 'account/dashboard', element: <Dashboard /> },
      { path: 'account/orders', element: <Orders /> },
      { path: 'account/addresses', element: <Addresses /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
