import mongoose, { Schema, Model } from "mongoose";

export interface AdminDocument {
  name: string;
  email: string;
  password: string;
}

const AdminSchema = new Schema<AdminDocument>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true },
});

export const AdminModel: Model<AdminDocument> =
  mongoose.models.Admin || mongoose.model<AdminDocument>("Admin", AdminSchema);


