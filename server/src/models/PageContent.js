import mongoose from 'mongoose';

const { Schema } = mongoose;

const pageContentSchema = new Schema(
  {
    pageKey: { type: String, required: true, unique: true }, // 'home-hero', 'our-story', 'sustainability', 'impact', 'faq', etc.
    blocks: [
      {
        key: String, // 'heading', 'subtext', 'ctaLabel', 'image'
        value: Schema.Types.Mixed,
      },
    ],
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const PageContent = mongoose.model('PageContent', pageContentSchema);
export default PageContent;
