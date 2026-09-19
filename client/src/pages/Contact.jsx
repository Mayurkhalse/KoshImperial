import React, { useState } from 'react';
import { SectionHeading } from '../components/shared/SectionHeading.jsx';
import { Input } from '../components/common/Input.jsx';
import { Button } from '../components/common/Button.jsx';
import { Breadcrumbs } from '../components/common/Breadcrumbs.jsx';
import { useUIStore } from '../store/uiStore.js';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const Contact = () => {
  const { addToast } = useUIStore();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Your inquiry has been delivered to our atelier concierge.', 'success');
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <div className="py-12 md:py-20 bg-milkglass-base min-h-screen">
      <div className="max-w-container mx-auto px-4 md:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Client Concierge & Contact' }]} />

        <SectionHeading
          eyebrow="CLIENT CONCIERGE"
          title="Connect with our craft"
          accent="atelier."
          subtitle="Whether you have questions regarding botanical seed varieties, bespoke gifting, or care instructions, our team is here."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Form Left (7 cols) */}
          <div className="lg:col-span-7 bg-milkglass-300 border border-driftwood-300 p-8 md:p-10 shadow-luxury">
            <h3 className="font-serif text-2xl text-evergreen-700 mb-6 font-normal">
              Send an Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Aarav Sharma"
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="aarav@example.com"
                required
              />

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-evergreen-700 mb-1.5">
                  Your Message
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our concierge assist you today?"
                  required
                  className="w-full bg-milkglass-100 text-charcoal border border-driftwood-base p-4 text-sm focus:outline-none focus:border-mahogany-base"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                Dispatch Inquiry
              </Button>
            </form>
          </div>

          {/* Contact Details Right (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:pl-6">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-evergreen-700 font-normal">
                Atelier Headquarters
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed font-sans">
                Our design studio and seed testing workshop is nestled in Bangalore, where each pattern
                is engineered for circular harmony.
              </p>
            </div>

            <div className="space-y-4 text-sm text-charcoal/90">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-mahogany-base shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-evergreen-700">Kosh Imperial Atelier</p>
                  <p className="text-xs text-muted-brown">14 Heritage Way, Indiranagar, Bangalore, 560038, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-mahogany-base shrink-0" />
                <a href="mailto:concierge@koshimperial.com" className="hover:text-mahogany-base transition-colors">
                  concierge@koshimperial.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-mahogany-base shrink-0" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-mahogany-base shrink-0" />
                <span className="text-xs text-muted-brown">Mon – Sat: 10:00 AM – 6:00 PM IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
