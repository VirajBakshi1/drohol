import { Schema, model, models } from 'mongoose';

const AdminConfigSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    pinHash: { type: String, required: true },
    pinSalt: { type: String, required: true },
  },
  { timestamps: true }
);

if (models.AdminConfig) delete (models as Record<string, unknown>).AdminConfig;
export const AdminConfig = model('AdminConfig', AdminConfigSchema);
