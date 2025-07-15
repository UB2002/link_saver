import mongoose from 'mongoose';

const BookmarkSchema = new mongoose.Schema({
  user:    { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  url:     { type: String, required: true },
  title:   { type: String, required: true },
  favicon: { type: String },
  summary: { type: String }
}, { timestamps: true });

export default mongoose.models.Bookmark || mongoose.model('Bookmark', BookmarkSchema);
