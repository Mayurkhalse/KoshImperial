import api from './api.js';

export const contentService = {
  getPageContent: async (pageKey) => {
    try {
      const res = await api.get(`/content/${pageKey}`);
      const blocks = res.data?.data?.blocks || {};
      if (blocks.eyebrow) {
        blocks.eyebrow = blocks.eyebrow.replace(/LUXURY ECO-CRAFT/gi, 'THE ART OF CONSCIOUS LIVING');
      }
      return blocks;
    } catch {
      return {};
    }
  },
};
