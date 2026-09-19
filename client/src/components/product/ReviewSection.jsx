import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../../services/productService.js';
import { useAuthStore } from '../../store/authStore.js';
import { useUIStore } from '../../store/uiStore.js';
import { Button } from '../common/Button.jsx';
import { Input } from '../common/Input.jsx';
import { Star, CheckCircle2 } from 'lucide-react';

export const ReviewSection = ({ productId }) => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const { addToast } = useUIStore();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const { data: reviewsData, isLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => productService.getProductReviews(productId),
    enabled: Boolean(productId),
  });

  const reviews = reviewsData?.data || [];

  const reviewMutation = useMutation({
    mutationFn: (payload) => productService.submitReview(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
      addToast('Thank you for sharing your experience!', 'success');
      setTitle('');
      setComment('');
    },
    onError: (err) => {
      addToast(err.response?.data?.message || 'Could not submit review', 'error');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment) return;
    reviewMutation.mutate({ rating, title, comment });
  };

  return (
    <div className="pt-16 border-t border-driftwood-300">
      <div className="max-w-4xl mx-auto space-y-12">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] font-sans font-semibold text-mahogany-base mb-2">
            CLIENT EXPERIENCES
          </p>
          <h2 className="font-serif text-3xl text-evergreen-700 font-normal">
            Reflections on <span className="italic font-serif text-mahogany-base">craft & soil.</span>
          </h2>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-sm text-muted-brown italic py-6">
              Be the first to share your thoughts on this plantable piece.
            </p>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="p-6 bg-milkglass-100 border border-driftwood-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base text-evergreen-700 font-medium">
                      {rev.user?.name || 'Verified Client'}
                    </span>
                    {rev.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-success font-medium uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex text-mahogany-base">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-mahogany-base text-mahogany-base' : 'text-driftwood-base'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {rev.title && <h4 className="font-medium text-sm text-charcoal">{rev.title}</h4>}
                <p className="text-sm text-charcoal/80 leading-relaxed font-sans">{rev.comment}</p>
                <p className="text-[11px] text-muted-brown">
                  {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Submit Review Form */}
        {isAuthenticated ? (
          <form onSubmit={handleSubmit} className="p-8 bg-milkglass-300 border border-driftwood-300 space-y-5">
            <h3 className="font-serif text-xl text-evergreen-700 font-normal">
              Share Your Experience
            </h3>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-evergreen-700 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-mahogany-base hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-mahogany-base text-mahogany-base' : 'text-driftwood-base'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Review Headline (Optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Exceptional tactile feel and circular ethos"
            />

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-evergreen-700 mb-1.5">
                Your Review
              </label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Describe the craft, stitching, packaging, or planting experience..."
                className="w-full bg-milkglass-100 text-charcoal border border-driftwood-base p-3 text-sm focus:outline-none focus:border-mahogany-base"
              />
            </div>

            <Button type="submit" variant="primary" isLoading={reviewMutation.isPending}>
              Submit Review
            </Button>
          </form>
        ) : (
          <div className="p-6 bg-milkglass-300 border border-driftwood-300 text-center">
            <p className="text-sm text-charcoal mb-3">Please sign in to share a verified review.</p>
            <Button variant="secondary" size="sm" onClick={() => (window.location.href = '/account/login')}>
              Sign In to Review
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
