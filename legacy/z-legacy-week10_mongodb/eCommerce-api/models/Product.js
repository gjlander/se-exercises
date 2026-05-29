import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Name is required'] },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Must include a category'] }
  },
  { timestamps: true }
);

export default model('Product', productSchema);
