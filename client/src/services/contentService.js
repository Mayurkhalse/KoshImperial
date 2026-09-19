import api from './api.js';

export const contentService = {
  getPageContent: async (pageKey) => {
    try {
      const res = await api.get(`/content/${pageKey}`);
      return res.data?.data?.blocks || {};
    } catch {
      return {};
    }
  },
};
