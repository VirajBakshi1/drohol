import { Schema, model, models } from 'mongoose';

// Research Projects (funded)
const ResearchProjectSchema = new Schema({
  title: { type: String, required: true },
  fundingAgency: { type: String, required: true },
  amount: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  status: { type: String, enum: ['Completed', 'Ongoing'], default: 'Ongoing' },
  location: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// PhD Students
const PhDStudentSchema = new Schema({
  title: { type: String, required: true },
  scholar: { type: String, required: true },
  university: { type: String },
  awardDate: { type: String },
  fellowship: { type: String },
  status: { type: String, enum: ['Completed', 'In Progress'], required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Patents
const PatentSchema = new Schema({
  title: { type: String, required: true },
  applicationNumber: { type: String },
  applicationDate: { type: String },
  number: { type: String },
  letterNumber: { type: String },
  grantDate: { type: String },
  status: { type: String, enum: ['Awarded', 'Filed'], required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const ResearchProject = models.ResearchProject || model('ResearchProject', ResearchProjectSchema);
export const PhDStudent = models.PhDStudent || model('PhDStudent', PhDStudentSchema);
export const Patent = models.Patent || model('Patent', PatentSchema);
