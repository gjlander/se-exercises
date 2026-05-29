import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required']
    },
    products: {
      type: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required']
          },
          quantity: { type: Number, default: 1 }
        }
      ]
    },
    total: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default model('Order', orderSchema);
