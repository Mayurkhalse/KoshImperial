import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Sprout, ArrowRight, Package, Home } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { Button } from '../components/common/Button.jsx';
import { paymentService } from '../services/paymentService.js';
import { formatCurrency } from '../utils/formatCurrency.js';

export const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const txnId = searchParams.get('txn');
  const [statusData, setStatusData] = useState(null);
  const [isVerifying, setIsVerifying] = useState(Boolean(txnId));

  useEffect(() => {
    if (txnId) {
      paymentService
        .getPaymentStatus(txnId)
        .then((res) => {
          setStatusData(res.data);
        })
        .catch((err) => {
          console.error('Status poll error:', err);
        })
        .finally(() => {
          setIsVerifying(false);
        });
    }
  }, [txnId]);

  return (
    <div className="py-12 md:py-20 bg-milkglass-base min-h-screen">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-8">
        <div className="flex justify-start">
          <Breadcrumbs items={[{ label: 'Order Confirmation' }]} />
        </div>

        <div className="w-16 h-16 bg-success/15 border border-success/30 text-success rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-mahogany-base">
            CONFIRMATION & REVERENCE
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-evergreen-700 font-normal">
            Thank you for your conscious acquisition.
          </h1>
          <p className="text-sm sm:text-base text-charcoal/80 max-w-md mx-auto leading-relaxed">
            Your order has been recorded in our artisan ledger. A confirmation and tracking digest
            has been dispatched to your email.
          </p>
        </div>

        {txnId && (
          <div className="p-6 bg-milkglass-100 border border-driftwood-300 text-left space-y-2 text-xs text-charcoal/90 shadow-luxury">
            <div className="flex justify-between">
              <span className="text-muted-brown">Transaction Reference:</span>
              <span className="font-mono font-semibold text-evergreen-700">{txnId}</span>
            </div>
            {statusData?.amount && (
              <div className="flex justify-between">
                <span className="text-muted-brown">Total Paid:</span>
                <span className="font-semibold text-mahogany-base">
                  {formatCurrency(statusData.amount)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-brown">Status:</span>
              <span className="capitalize font-semibold text-success">
                {isVerifying ? 'Verifying...' : statusData?.status || 'Confirmed'}
              </span>
            </div>
            {statusData?.paymentMethod && (
              <div className="flex justify-between">
                <span className="text-muted-brown">Method:</span>
                <span className="capitalize">{statusData.paymentMethod}</span>
              </div>
            )}
          </div>
        )}

        {/* The plantable callout */}
        <div className="p-6 bg-evergreen-900/5 border border-evergreen-700/20 rounded-none text-left flex items-start gap-4">
          <Sprout className="w-6 h-6 text-evergreen-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-serif text-sm text-evergreen-700 font-medium">
              Living Wildflower Seed Package
            </h4>
            <p className="text-xs text-charcoal/80 leading-relaxed font-sans">
              Your wallet will arrive packaged inside handmade plantable seed paper boxes. Remember to
              save the seed card to plant alongside your heirloom in years to come.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary" size="md">
              Continue Browsing
            </Button>
          </Link>
          <Link to="/account/orders">
            <Button variant="ghost" size="md">
              View In Order History
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
