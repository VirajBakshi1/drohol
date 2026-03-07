import mongoose, { Schema, model, models } from 'mongoose';

const StatsSchema = new Schema({
  academicExperience: { type: String, default: '27+' },
  industrialExperience: { type: String, default: '1.7' },
  researchExperience: { type: String, default: '17' },
  administrativeExperience: { type: String, default: '15' },
  internationalJournals: { type: Number, default: 26 },
  nationalJournals: { type: Number, default: 3 },
  internationalConferences: { type: Number, default: 54 },
  nationalConferences: { type: Number, default: 5 },
  books: { type: Number, default: 2 },
  bookChapters: { type: Number, default: 3 },
  patentsAwarded: { type: Number, default: 4 },
  patentsFiled: { type: Number, default: 0 },
  phdCompleted: { type: Number, default: 3 },
  phdOngoing: { type: Number, default: 5 },
  mtechProjects: { type: Number, default: 58 },
  btechProjects: { type: String, default: '60+' },
  internationalAwards: { type: Number, default: 5 },
  nationalAwards: { type: Number, default: 4 },
  instituteAwards: { type: Number, default: 8 },
  grantsReceived: { type: String, default: '₹3+ Crores' },
}, { _id: false });

const PersonalInfoSchema = new Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  institution: { type: String, required: true },
  email: [{ type: String }],
  qualification: { type: String },
  summary: { type: String },
  profileImage: { type: String, default: 'https://0.academia-photos.com/31412733/84850451/73489486/s200_ss.ohol.jpeg' },
  stats: { type: StatsSchema, default: () => ({}) },
  currentPortfolios: [{ type: String }],
  industryCoalitions: [{ type: String }],
  professionalPhilosophy: { type: String },
  researchInterests: [{ type: String }],
}, { timestamps: true });

export const PersonalInfo = models.PersonalInfo || model('PersonalInfo', PersonalInfoSchema);
