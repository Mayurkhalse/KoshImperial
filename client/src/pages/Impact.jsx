import React from 'react';
import { SectionHeading } from '../components/shared/SectionHeading.jsx';
import { ImpactStrip } from '../components/home/ImpactStrip.jsx';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../services/contentService.js';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { Sprout, Droplets, Sun, Flower } from 'lucide-react';

export const Impact = () => {
  const { data: impactContent } = useQuery({
    queryKey: ['content', 'impact'],
    queryFn: () => contentService.getPageContent('impact'),
  });

  const flowers = [
    { name: 'Common Daisy', seed: 'Bellis perennis', season: 'Spring to Autumn', color: 'White & Gold' },
    { name: 'Wild Chamomile', seed: 'Matricaria chamomilla', season: 'Summer', color: 'Cream' },
    { name: 'Sweet Basil', seed: 'Ocimum basilicum', season: 'Warm months', color: 'Herbal Foliage' },
    { name: 'English Lavender', seed: 'Lavandula angustifolia', season: 'Mid-summer', color: 'Violet' },
  ];

  return (
    <div className="bg-milkglass-base min-h-screen">
      <div className="py-12 md:py-20 max-w-container mx-auto px-4 md:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Ecological Impact' }]} />

        <SectionHeading
          eyebrow="ECOLOGICAL COMMITMENT"
          title="Restoring native habitats one"
          accent="pocket at a time."
          subtitle="Every wallet is infused with botanical seeds specifically selected to support native bees, butterflies, and pollinator networks."
          centered
        />

        {/* Botanical Species Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {flowers.map((f, idx) => (
            <div key={idx} className="p-6 bg-milkglass-100 border border-driftwood-300 space-y-3 shadow-luxury">
              <Flower className="w-6 h-6 text-mahogany-base" />
              <h3 className="font-serif text-lg text-evergreen-700 font-medium">{f.name}</h3>
              <p className="text-xs font-mono text-muted-brown italic">{f.seed}</p>
              <div className="pt-2 border-t border-driftwood-300 text-xs text-charcoal/80 space-y-1">
                <p>Blooming: {f.season}</p>
                <p>Tones: {f.color}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImpactStrip data={impactContent || {}} />
    </div>
  );
};
