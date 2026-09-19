import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { CheckoutSteps } from '../components/checkout/CheckoutSteps.jsx';
import { AddressForm } from '../components/checkout/AddressForm.jsx';
import { PaymentSelector } from '../components/checkout/PaymentSelector.jsx';
import { OrderSummary } from '../components/checkout/OrderSummary.jsx';
import { orderService } from '../services/orderService.js';
import { paymentService } from '../services/paymentService.js';
import { useUIStore } from '../store/uiStore.js';
import { useAuthStore } from '../store/authStore.js';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, summary } = useCart();
  const { addToast } = useUIStore();
  const { isAuthenticated } = useAuthStore();

  const [activeStep, setActiveStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  useEffect(() => {
    // Redirect if not signed in or cart empty
    if (!isAuthenticated) {
      addToast('Please sign in to proceed with secure checkout', 'info');
      navigate('/account/login?redirect=/checkout');
      return;
    }
    if (!cart?.items || cart.items.length === 0) {
      navigate('/cart');
      return;
    }

    // Fetch dynamic payment gateways
    paymentService
      .getMethods()
      .then((res) => {
        const methods = res.data || [];
        setPaymentMethods(methods);
        if (methods.length > 0) {
          setSelectedMethod(methods[0].id);
        }
      })
      .catch(() => {
        setPaymentMethods([
          { id: 'phonepe', name: 'PhonePe PG', description: 'UPI & Cards', badge: 'Active' },
          { id: 'mock', name: 'Simulated Sandbox Checkout', description: 'Test Mode', badge: 'Instant' },
        ]);
        setSelectedMethod('phonepe');
      });
  }, [isAuthenticated, cart, navigate, addToast]);

  const handleAddressSubmit = async (address) => {
    setShippingAddress(address);
    setIsProcessing(true);
    try {
      // Create pending order
      const res = await orderService.createOrder({ shippingAddress: address });
      setCreatedOrder(res.data);
      setActiveStep(2);
    } catch (err) {
      addToast(err.response?.data?.message || 'Could not initiate order', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAuthorizePayment = async () => {
    if (!createdOrder) return;
    setIsProcessing(true);
    try {
      const res = await paymentService.initiatePayment(createdOrder._id, selectedMethod);
      const { redirectUrl } = res.data;

      if (redirectUrl) {
        if (redirectUrl.startsWith('http')) {
          window.location.href = redirectUrl;
        } else {
          navigate(redirectUrl);
        }
      } else {
        navigate(`/order-confirmation?orderId=${createdOrder._id}&status=success`);
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Payment initiation failed', 'error');
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-milkglass-base min-h-screen">
      <div className="max-w-container mx-auto px-4 md:px-8 space-y-6">
        <Breadcrumbs items={[{ label: 'Bag', href: '/cart' }, { label: 'Checkout' }]} />

        <h1 className="font-serif text-3xl md:text-4xl text-evergreen-700 font-normal text-center mb-4">
          Conscious Checkout
        </h1>

        <CheckoutSteps activeStep={activeStep} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Main Form Left (7 cols) */}
          <div className="lg:col-span-7 bg-milkglass-100 border border-driftwood-300 p-6 md:p-10 shadow-luxury">
            {activeStep === 1 && (
              <div>
                <h2 className="font-serif text-2xl text-evergreen-700 mb-6 font-normal">
                  1. Shipping Destination
                </h2>
                <AddressForm onSubmit={handleAddressSubmit} isLoading={isProcessing} />
              </div>
            )}

            {activeStep === 2 && (
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-driftwood-300">
                  <h2 className="font-serif text-2xl text-evergreen-700 font-normal">
                    2. Payment Method
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="text-xs uppercase tracking-wider text-mahogany-base font-semibold hover:underline"
                  >
                    Edit Address
                  </button>
                </div>

                <PaymentSelector
                  methods={paymentMethods}
                  selectedMethod={selectedMethod}
                  onSelect={setSelectedMethod}
                  onPay={handleAuthorizePayment}
                  isLoading={isProcessing}
                />
              </div>
            )}
          </div>

          {/* Summary Right (5 cols) */}
          <div className="lg:col-span-5">
            <OrderSummary items={cart?.items || []} summary={summary} />
          </div>
        </div>
      </div>
    </div>
  );
};
