import React from 'react';
import { CreditCard, Smartphone, CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button.jsx';

export const PaymentSelector = ({ methods = [], selectedMethod, onSelect, onPay, isLoading }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {methods.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <div
              key={method.id}
              onClick={() => onSelect(method.id)}
              className={`p-5 border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                isSelected
                  ? 'bg-milkglass-100 border-mahogany-base ring-1 ring-mahogany-base shadow-sm'
                  : 'bg-milkglass-300/60 border-driftwood-300 hover:border-evergreen-700/60'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-milkglass-base border border-driftwood-300 shrink-0 text-evergreen-700">
                  {method.icon === 'phonepe' ? (
                    <Smartphone className="w-5 h-5" />
                  ) : (
                    <CreditCard className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base text-evergreen-700 font-medium">
                      {method.name}
                    </span>
                    {method.badge && (
                      <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 bg-driftwood-300 text-evergreen-700">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-charcoal/80 mt-1 leading-relaxed">{method.description}</p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                  isSelected
                    ? 'border-mahogany-base bg-mahogany-base text-milkglass-base'
                    : 'border-driftwood-600 bg-transparent'
                }`}
              >
                {isSelected && <CheckCircle className="w-4 h-4 fill-mahogany-base text-milkglass-base" />}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-milkglass-300 border border-driftwood-300 flex items-center gap-3 text-xs text-muted-brown">
        <ShieldCheck className="w-5 h-5 text-evergreen-700 shrink-0" />
        <span>
          Bank-grade 256-bit encryption. Payment credentials are never stored on Kosh Imperial servers.
        </span>
      </div>

      <Button
        variant="primary"
        size="lg"
        onClick={onPay}
        isLoading={isLoading}
        disabled={!selectedMethod}
        className="w-full sm:w-auto"
      >
        Authorize & Complete Payment
      </Button>
    </div>
  );
};
