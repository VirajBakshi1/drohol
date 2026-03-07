import { Schema, model, models } from 'mongoose';

const GalleryVideoSchema = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

if (models.GalleryVideo) delete (models as Record<string, unknown>).GalleryVideo;
export const GalleryVideo = model('GalleryVideo', GalleryVideoSchema);
