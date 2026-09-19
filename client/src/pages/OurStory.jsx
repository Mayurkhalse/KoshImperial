import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { StoryHero } from '../components/story/StoryHero.jsx';
import { FounderNote } from '../components/story/FounderNote.jsx';
import { Milestones } from '../components/story/Milestones.jsx';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { contentService } from '../services/contentService.js';

export const OurStory = () => {
  const { data: storyContent } = useQuery({
    queryKey: ['content', 'our-story'],
    queryFn: () => contentService.getPageContent('our-story'),
  });

  return (
    <div>
      <div className="bg-milkglass-base pt-6 pb-2 border-b border-driftwood-300">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <Breadcrumbs items={[{ label: 'Our Story & Heritage' }]} />
        </div>
      </div>
      <StoryHero />
      <FounderNote
        quote={storyContent?.pullQuote}
        author={storyContent?.founderName}
      />
      <Milestones />
    </div>
  );
};
