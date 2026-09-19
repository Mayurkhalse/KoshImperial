import React from 'react';
import { useUIStore } from '../../store/uiStore.js';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const borderColors = {
          success: 'border-l-success',
          error: 'border-l-error',
          info: 'border-l-mahogany-base',
        };

        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-success shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-error shrink-0" />,
          info: <Info className="w-5 h-5 text-mahogany-base shrink-0" />,
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-milkglass-100 text-evergreen-700 shadow-luxury border border-driftwood-300 border-l-4 ${
              borderColors[toast.type] || borderColors.info
            } p-4 flex items-center justify-between gap-3 animate-fade-in`}
          >
            <div className="flex items-center gap-3">
              {icons[toast.type] || icons.info}
              <p className="text-xs tracking-wide font-medium">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-muted-brown hover:text-charcoal p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
