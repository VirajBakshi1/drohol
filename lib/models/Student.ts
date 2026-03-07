import { Schema, model, models } from 'mongoose';

// Student projects (MTech, BTech)
const StudentProjectSchema = new Schema({
  student: { type: String, required: true },
  year: { type: String, required: true },
  degree: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String }, // e.g. "PhD Project - Completed", "MTech"
  institute: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Student achievements
const StudentAchievementSchema = new Schema({
  achievement: { type: String, required: true },
  students: { type: String, required: true },
  year: { type: String, required: true },
  prize: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Competition mentorship
const CompetitionMentorshipSchema = new Schema({
  competition: { type: String, required: true },
  years: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String },
  achievements: [{ type: String }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const StudentProject = models.StudentProject || model('StudentProject', StudentProjectSchema);
export const StudentAchievement = models.StudentAchievement || model('StudentAchievement', StudentAchievementSchema);
export const CompetitionMentorship = models.CompetitionMentorship || model('CompetitionMentorship', CompetitionMentorshipSchema);
