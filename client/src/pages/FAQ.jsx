import React from 'react';
import { SectionHeading } from '../components/shared/SectionHeading.jsx';
import { Accordion } from '../components/common/Accordion.jsx';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { useQuery } from '@tanstack/react-query';
import { contentService } from '../services/contentService.js';
import { Loader } from '../components/common/Loader.jsx';

export const FAQ = () => {
  const { data: faqContent, isLoading } = useQuery({
    queryKey: ['content', 'faq'],
    queryFn: () => contentService.getPageContent('faq'),
  });

  const defaultFaqs = [
    {
      q: 'How does a plantable wallet actually work?',
      a: 'The inner structural lining of every Kosh Imperial wallet is woven with natural handmade paper embedded with non-GMO wildflower and botanical seeds. After years or decades of use, simply moisten the wallet, place it under potting soil, water it gently, and sprouts will emerge within 7–14 days.',
    },
    {
      q: 'Will the seeds germinate while I am carrying the wallet?',
      a: 'Not at all. Seeds require continuous moisture, soil nutrients, and sunlight to awaken. Daily pocket humidity or occasional raindrops will not trigger germination.',
    },
    {
      q: 'How durable is cactus and mycelium leather compared to animal hide?',
      a: 'Our plant-based bio-leathers are tested for over 100,000 flex cycles, offering comparable tensile strength, water resistance, and graceful patina development over time without cracking.',
    },
    {
      q: 'What is your shipping and return policy?',
      a: 'We offer complimentary express shipping across India on orders above ₹2,000. All unworn items in original seed-paper packaging can be returned within 14 days.',
    },
    {
      q: 'Can I gift a plantable wallet?',
      a: 'Every Kosh Imperial wallet arrives in our signature plantable seed gift box, accompanied by hand-pressed planting instructions and a personalized artisan authenticity card.',
    },
  ];

  const items = faqContent?.items || defaultFaqs;

  return (
    <div className="py-12 md:py-20 bg-milkglass-base min-h-screen">
      <div className="max-w-container mx-auto px-4 md:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

        <SectionHeading
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Everything you need to know about"
          accent="seed & craft."
          centered
        />

        <div className="max-w-[780px] mx-auto mt-12">
          {isLoading ? (
            <Loader label="Loading guidance..." />
          ) : (
            <Accordion items={items} />
          )}
        </div>
      </div>
    </div>
  );
};
