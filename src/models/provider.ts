import mongoose, { Schema, Document } from 'mongoose';

export interface IProvider extends Document {
  name: string;
  email: string;
  password: string;
  patients: mongoose.Types.ObjectId[];
  createdAt: Date; 
}

const ProviderSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
  },
  { timestamps: true }
);

const Provider = mongoose.model<IProvider>('Provider', ProviderSchema);

export default Provider;
