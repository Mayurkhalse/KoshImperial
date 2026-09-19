import PageContent from '../models/PageContent.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getPageContent = async (req, res) => {
  const { pageKey } = req.params;
  const content = await PageContent.findOne({ pageKey });

  if (!content) {
    return ApiResponse.error(res, `Content for '${pageKey}' not found`, 404);
  }

  // Convert array of { key, value } blocks into a clean dictionary for frontend consumption
  const blocksMap = {};
  content.blocks.forEach((b) => {
    blocksMap[b.key] = b.value;
  });

  return ApiResponse.success(res, {
    pageKey: content.pageKey,
    blocks: blocksMap,
    rawBlocks: content.blocks,
    updatedAt: content.updatedAt,
  });
};

export const updatePageContent = async (req, res) => {
  const { pageKey } = req.params;
  const { blocks } = req.body;

  let formattedBlocks = [];
  if (Array.isArray(blocks)) {
    formattedBlocks = blocks;
  } else if (typeof blocks === 'object') {
    formattedBlocks = Object.entries(blocks).map(([key, value]) => ({ key, value }));
  }

  const content = await PageContent.findOneAndUpdate(
    { pageKey },
    {
      pageKey,
      blocks: formattedBlocks,
      updatedBy: req.user._id,
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return ApiResponse.success(res, content, 'Content updated successfully');
};
