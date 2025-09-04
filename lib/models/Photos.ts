import mongoose, { Schema, Model } from "mongoose";

export interface PhotoDocument {
  title: string;
  description: string;
  photos?: string;
}

const PhotoSchema = new Schema<PhotoDocument>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  photos: { type: String },
});

export const PhotoModel: Model<PhotoDocument> =
  mongoose.models.Photos || mongoose.model<PhotoDocument>("Photos", PhotoSchema);


