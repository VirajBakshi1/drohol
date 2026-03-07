import { Schema, model, models } from 'mongoose';

const AwardSchema = new Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  organization: { type: String, required: true },
  description: { type: String },
  /// 'international' | 'national' | 'institute'
  category: { type: String, enum: ['international', 'national', 'institute'], required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Award = models.Award || model('Award', AwardSchema);
