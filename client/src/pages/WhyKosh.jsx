import React from 'react';
import { SectionHeading } from '../components/shared/SectionHeading.jsx';
import { IconTextCard } from '../components/shared/IconTextCard.jsx';
import { Leaf, Sparkles, HeartHandshake, ShieldCheck, Sprout, Clock } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { CTAButton } from '../components/shared/CTAButton.jsx';

export const WhyKosh = () => {
  const pillars = [
    {
      icon: Leaf,
      title: 'Sustainable Materials First',
      description:
        'We never make compromises with synthetic vinyl, PVC, or toxic chrome tanning. Every raw ingredient is plant-based and renewably sourced.',
    },
    {
      icon: Sparkles,
      title: 'Thoughtful, Minimal Design',
      description:
        'Understated silhouettes engineered to eliminate pocket bulk while celebrating the natural grain and organic texture of bio-fibers.',
    },
    {
      icon: HeartHandshake,
      title: 'Handcrafted With Care',
      description:
        'Master artisans hand-cut, fold, and stitch each wallet with meticulous attention to detail, honouring heirloom craft traditions.',
    },
    {
      icon: ShieldCheck,
      title: 'Built to Last a Decade',
      description:
        'Laboratory flex-tested for over 100,000 movements. Water resistant, tear resistant, and designed to gain a beautiful patina with daily use.',
    },
    {
      icon: Sprout,
      title: 'Living Botanical Seeds',
      description:
        'The first accessories brand to weave viable wildflower seeds directly into wallet linings, making obsolescence an act of regeneration.',
    },
    {
      icon: Clock,
      title: 'Zero Plastic Packaging',
      description:
        'Delivered in biodegradable plantable seed boxes with soy-based inks. Even our courier mailers decompose in home compost.',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-milkglass-base min-h-screen">
      <div className="max-w-container mx-auto px-4 md:px-8 space-y-12">
        <Breadcrumbs items={[{ label: 'Why Kosh Imperial' }]} />

        <SectionHeading
          eyebrow="THE KOSH DISTINCTION"
          title="Why conscious connoisseurs choose"
          accent="Kosh Imperial."
          subtitle="We reject the false dichotomy between heirloom luxury and environmental reverence. You deserve both."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <IconTextCard
              key={idx}
              icon={pillar.icon}
              title={pillar.title}
              description={pillar.description}
            />
          ))}
        </div>

        <div className="pt-8 text-center">
          <CTAButton to="/shop" variant="primary" size="lg">
            Experience The Collection
          </CTAButton>
        </div>
      </div>
    </div>
  );
};
