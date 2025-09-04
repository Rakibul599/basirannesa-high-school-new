import mongoose, { Schema, Model } from "mongoose";

export interface VideoDocument {
  title: string;
  link: string;
  description: string;
}

const VideoSchema = new Schema<VideoDocument>({
    title: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    description: { type: String, required: true }
});

export const VideoModel: Model<VideoDocument> =
  mongoose.models.Videos || mongoose.model<VideoDocument>("Videos", VideoSchema);


