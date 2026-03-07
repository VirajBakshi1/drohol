import { Schema, model, models } from 'mongoose';

const PublicationSchema = new Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  year: { type: String, required: true },
  // 'book' | 'bookChapter' | 'internationalJournal' | 'nationalJournal' | 'internationalConference' | 'nationalConference'
  type: {
    type: String,
    enum: ['book', 'bookChapter', 'internationalJournal', 'nationalJournal', 'internationalConference', 'nationalConference'],
    required: true,
  },
  // For journals & proceedings
  journal: { type: String },
  conference: { type: String },
  volume: { type: String },
  pages: { type: String },
  doi: { type: String },
  issn: { type: String },
  indexing: { type: String },
  award: { type: String },
  location: { type: String },
  date: { type: String },
  // For books
  publisher: { type: String },
  edition: { type: String },
  chapter: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Delete cached model to pick up schema changes after hot reload
if (models.Publication) delete (models as Record<string, unknown>).Publication;

export const Publication = model('Publication', PublicationSchema);
