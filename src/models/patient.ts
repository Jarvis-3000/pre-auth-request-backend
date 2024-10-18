import mongoose, { Document, Schema } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  age: number;
  medicalHistory: string[];
  treatmentPlan: string;
  medicationHistory: string[];
  labResults: string[];
  providerId: Schema.Types.ObjectId; 
  preAuthorizationRequests: Schema.Types.ObjectId[];
  createdAt: Date; 
}

const PatientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    medicalHistory: [{ type: String }],
    treatmentPlan: { type: String, required: true },
    medicationHistory: [{ type: String }],
    labResults: [{ type: String }],
    providerId: {
      type: Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },
    preAuthorizationRequests: [
      { type: Schema.Types.ObjectId, ref: 'PreAuthorizationRequest' },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IPatient>('Patient', PatientSchema);
