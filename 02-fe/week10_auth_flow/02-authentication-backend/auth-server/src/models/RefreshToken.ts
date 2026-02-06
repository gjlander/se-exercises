import { Schema, model } from 'mongoose';
import { REFRESH_TOKEN_TTL } from '#config';

const refreshTokenSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    expireAt: {
      type: Date,
      default: new Date(Date.now() + REFRESH_TOKEN_TTL * 1000) // in milliseconds
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const RefreshToken = model('RefreshToken', refreshTokenSchema);

export default RefreshToken;
