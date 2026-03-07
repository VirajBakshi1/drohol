import { Schema, model, models } from 'mongoose';

const GalleryImageSchema = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    category: { type: String, default: 'general' },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

if (models.GalleryImage) delete (models as Record<string, unknown>).GalleryImage;
export const GalleryImage = model('GalleryImage', GalleryImageSchema);
