import { Schema, model, models } from 'mongoose';

const HeroSlideSchema = new Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  alt: { type: String, default: '' },
  active: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

if (models.HeroSlide) delete (models as Record<string, unknown>).HeroSlide;
export const HeroSlide = model('HeroSlide', HeroSlideSchema);
