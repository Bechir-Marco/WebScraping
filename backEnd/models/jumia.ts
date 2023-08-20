import { Document, Schema, model } from 'mongoose';

interface IJumia extends Document {
  url: string;
  title: string;
  category: string;
  description: string;
  image: string;
  fiche_technique: string;
  
}

const jumiaSchema = new Schema(
  {
    url: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    fiche_technique: { type: String, required: true },
    
  },
  { collection: 'jumia' }
);

export default model<IJumia>('jumia', jumiaSchema);
jumiaSchema.index({ description : 'text', fiche_technique : 'text', title : 'text', category : 'text'},{name: "TextIndex"})
