import mongoose, { Document, Schema } from 'mongoose';

export interface IPreAuthorizationRequest extends Document {
  patientId: Schema.Types.ObjectId;
  providerId: Schema.Types.ObjectId;
  treatmentType: string;
  insurancePlan: string;
  dateOfService: Date;
  diagnosisCode: string;
  status: 'pending' | 'approved' | 'denied';
  doctorNotes: string;
  createdAt: Date; 
}

const PreAuthorizationRequestSchema: Schema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, required: true },
    providerId: { type: Schema.Types.ObjectId, required: true },
    treatmentType: { type: String, required: true },
    insurancePlan: { type: String, required: true },
    dateOfService: { type: Date, required: true },
    diagnosisCode: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'denied'],
      default: 'pending',
    },
    doctorNotes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IPreAuthorizationRequest>(
  'PreAuthorizationRequest',
  PreAuthorizationRequestSchema
);
