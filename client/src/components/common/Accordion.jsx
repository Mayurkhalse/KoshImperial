import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Accordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-driftwood-300 border-t border-b border-driftwood-300">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`transition-colors duration-200 ${
              isOpen ? 'bg-milkglass-300/60' : 'hover:bg-milkglass-300/30'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full py-5 px-4 text-left flex items-center justify-between gap-4 focus:outline-none"
            >
              <span className="font-serif text-lg text-evergreen-700 font-medium">
                {item.q || item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-evergreen-700 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-mahogany-base' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-6 pt-1 text-sm text-charcoal/90 leading-relaxed max-w-3xl">
                {item.a || item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
