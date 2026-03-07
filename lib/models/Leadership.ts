import { Schema, model, models } from 'mongoose';

// Academic qualifications
const QualificationSchema = new Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  university: { type: String },
  year: { type: String },
  specialization: { type: String },
  class: { type: String },
  thesis: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Industrial / teaching experience
const ExperienceSchema = new Schema({
  type: { type: String, enum: ['industrial', 'teaching'], required: true },
  organization: { type: String, required: true },
  designation: { type: String, required: true },
  period: { type: String },
  duration: { type: String },
  responsibilities: { type: String },
  reason: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Professional memberships
const ProfessionalMembershipSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  organization: { type: String, required: true },
  year: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Present affiliations (roles)
const PresentAffiliationSchema = new Schema({
  role: { type: String, required: true },
  organization: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Grants received
const GrantSchema = new Schema({
  source: { type: String, required: true },
  amount: { type: String, required: true },
  year: { type: String },
  purpose: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const Qualification = models.Qualification || model('Qualification', QualificationSchema);
export const Experience = models.Experience || model('Experience', ExperienceSchema);
export const ProfessionalMembership = models.ProfessionalMembership || model('ProfessionalMembership', ProfessionalMembershipSchema);
export const PresentAffiliation = models.PresentAffiliation || model('PresentAffiliation', PresentAffiliationSchema);
export const Grant = models.Grant || model('Grant', GrantSchema);
