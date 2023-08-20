import { Document, Schema, model } from 'mongoose';

interface ITunisianet extends Document {
  url: string;
  title: string;
  category: string;
  fiche_technique: string;
  moredetails: string;
  description: string;
  image: string;
}

const tunisianetSchema = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    fiche_technique: { type: String, required: true },
    moredetails: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { collection: 'tunisiaNet' }
);

export default model<ITunisianet>('tunisianet', tunisianetSchema);
