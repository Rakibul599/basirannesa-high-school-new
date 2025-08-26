import mongoose, { Schema, Model } from "mongoose";

export interface SectionDocument {
  section: string;
  boys: number;
  girls: number;
}

export interface ClassGroupDocument {
  serialNo: number;
  className: string;
  sections: SectionDocument[];
}

const SectionSchema = new Schema<SectionDocument>({
  section: { type: String, default: "" },
  boys: { type: Number, default: 0 },
  girls: { type: Number, default: 0 },
});

const ClassGroupSchema = new Schema<ClassGroupDocument>({
  serialNo: { type: Number, required: true },
  className: { type: String, default: "" },
  sections: [SectionSchema],
});

export const ClassGroupModel: Model<ClassGroupDocument> =
  mongoose.models.ClassGroup || mongoose.model<ClassGroupDocument>("ClassGroup", ClassGroupSchema);


