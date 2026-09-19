import React from 'react';
import { MaterialsSection } from '../components/sustainability/MaterialsSection.jsx';
import { ProcessTimeline } from '../components/sustainability/ProcessTimeline.jsx';
import { ImpactStrip } from '../components/home/ImpactStrip.jsx';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../services/contentService.js';

export const Sustainability = () => {
  const { data: impactContent } = useQuery({
    queryKey: ['content', 'impact'],
    queryFn: () => contentService.getPageContent('impact'),
  });

  return (
    <div>
      <div className="bg-milkglass-base pt-6 pb-2 border-b border-driftwood-300">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <Breadcrumbs items={[{ label: 'Sustainability & Materials' }]} />
        </div>
      </div>
      <MaterialsSection />
      <ProcessTimeline />
      <ImpactStrip data={impactContent || {}} />
    </div>
  );
};
