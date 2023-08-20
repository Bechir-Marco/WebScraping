import { Document, Schema, model } from 'mongoose';

interface IAlKitab extends Document {
  url: string;
  title: string;
  category: string;
  description: string;
}

const alKitabSchema = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  { collection: 'alKitab' }
); 

export default model<IAlKitab>('alKitab', alKitabSchema);
