import { Document, Schema, model } from 'mongoose';

interface IMytek extends Document {
  url: string;
  title: string;
  category: string;
  description: string;
  image: string;
  fichetechnique: string;
}

const mytekSchema = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    fichetechnique: { type: String, required: true },
  },
  { collection: 'mytek' }
);

export default model<IMytek>('mytek', mytekSchema);
