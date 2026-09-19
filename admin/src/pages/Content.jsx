import React, { useState } from 'react';
import { PageContentEditor } from '../components/content/PageContentEditor.jsx';

export const Content = () => {
  const [activeSection, setActiveSection] = useState('home-hero');

  const sections = [
    { key: 'home-hero', label: 'Home — Hero Headline & Subtext' },
    { key: 'our-story', label: 'Our Story — Origins & Conviction' },
    { key: 'sustainability', label: 'Sustainability & Materials' },
    { key: 'impact', label: 'Impact — Live Stat Counters' },
    { key: 'faq', label: 'FAQ — Guidance Accordion' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-mahogany-base font-semibold">
          CMS & MARKETING
        </span>
        <h1 className="font-serif text-3xl text-evergreen-700 font-normal mt-1">
          Storefront Copy Editor
        </h1>
        <p className="text-xs text-muted-brown mt-1">
          Edit marketing copy and brand values without touching source code or redeploying.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-driftwood-300 pb-3">
        {sections.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setActiveSection(s.key)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors ${
              activeSection === s.key
                ? 'bg-evergreen-700 text-milkglass-base'
                : 'bg-white text-charcoal hover:bg-driftwood-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Editor Component */}
      <PageContentEditor key={activeSection} pageKey={activeSection} />
    </div>
  );
};
