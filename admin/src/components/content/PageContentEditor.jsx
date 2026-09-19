import React, { useState, useEffect } from 'react';
import api from '../../services/api.js';

export const PageContentEditor = ({ pageKey = 'home-hero' }) => {
  const [blocks, setBlocks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/content/${pageKey}`)
      .then((res) => {
        setBlocks(res.data?.data?.blocks || {});
      })
      .catch(() => {
        setBlocks({});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pageKey]);

  const handleChange = (key, val) => {
    setBlocks((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    try {
      await api.put(`/admin/content/${pageKey}`, { blocks });
      setMessage('Content published successfully to live storefront!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage('Failed to update content: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-xs uppercase tracking-widest text-muted-brown">Loading copy...</div>;
  }

  return (
    <form onSubmit={handleSave} className="bg-white border border-driftwood-300 p-8 space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-driftwood-300">
        <div>
          <h3 className="font-serif text-2xl text-evergreen-700 font-normal">
            Editing Section: <span className="font-mono text-base text-mahogany-base">{pageKey}</span>
          </h3>
          <p className="text-xs text-muted-brown">Changes reflect immediately on the customer-facing website.</p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 bg-evergreen-700 text-milkglass-base hover:bg-mahogany-base text-xs uppercase tracking-wider font-semibold transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Publishing...' : 'Publish to Live Site'}
        </button>
      </div>

      {message && (
        <div className="p-3 bg-milkglass-300 border border-driftwood-base text-xs text-evergreen-700 font-medium">
          {message}
        </div>
      )}

      {/* Render inputs dynamically based on keys */}
      <div className="space-y-4">
        {Object.entries(blocks).map(([key, val]) => {
          const isMultiline = typeof val === 'string' && val.length > 60;
          return (
            <div key={key}>
              <label className="block text-xs uppercase tracking-wider font-semibold text-evergreen-700 mb-1">
                {key}
              </label>
              {isMultiline ? (
                <textarea
                  rows={3}
                  value={val || ''}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-milkglass-300 border border-driftwood-base p-3 text-xs focus:outline-none focus:border-mahogany-base font-sans"
                />
              ) : (
                <input
                  type="text"
                  value={typeof val === 'string' ? val : JSON.stringify(val)}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-milkglass-300 border border-driftwood-base p-2.5 text-xs focus:outline-none focus:border-mahogany-base font-sans"
                />
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
};
