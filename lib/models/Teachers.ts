import mongoose, { Schema, Model } from "mongoose";

export interface TeacherDocument {
  name: string;
  email: string;
  phone: string;
  designation?: string;
  avatars?: string;
}

const TeacherSchema = new Schema<TeacherDocument>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  designation: { type: String },
  avatars: { type: String },
});

export const TeacherModel: Model<TeacherDocument> =
  mongoose.models.Teachers || mongoose.model<TeacherDocument>("Teachers", TeacherSchema);


