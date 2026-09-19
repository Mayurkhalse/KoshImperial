import React from 'react';
import { Check } from 'lucide-react';

export const CheckoutSteps = ({ activeStep = 1 }) => {
  const steps = [
    { number: 1, title: 'Shipping Address' },
    { number: 2, title: 'Payment Method' },
    { number: 3, title: 'Order Review' },
  ];

  return (
    <div className="py-6 border-b border-driftwood-300 mb-10">
      <div className="flex items-center justify-between max-w-xl mx-auto">
        {steps.map((step, idx) => {
          const isComplete = activeStep > step.number;
          const isActive = activeStep === step.number;

          return (
            <React.Fragment key={step.number}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    isComplete
                      ? 'bg-mahogany-base text-milkglass-base'
                      : isActive
                      ? 'bg-evergreen-700 text-milkglass-base ring-2 ring-evergreen-700 ring-offset-2 ring-offset-milkglass-base'
                      : 'bg-driftwood-300 text-driftwood-600'
                  }`}
                >
                  {isComplete ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.number}
                </div>
                <span
                  className={`text-xs uppercase tracking-wider font-medium hidden sm:inline ${
                    isActive
                      ? 'text-evergreen-700 font-semibold'
                      : isComplete
                      ? 'text-mahogany-base'
                      : 'text-driftwood-600'
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-[1.5px] mx-4 transition-colors ${
                    activeStep > step.number ? 'bg-mahogany-base' : 'bg-driftwood-base'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
