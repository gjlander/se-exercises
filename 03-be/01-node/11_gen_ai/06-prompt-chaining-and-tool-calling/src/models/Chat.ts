import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  role: {
    type: String,
    enum: ['assistant', 'developer', 'function', 'system', 'tool', 'user'],
    required: true
  },
  content: String,
  tool_call_id: String,
  tool_calls: { type: [{}], default: null }
});

const chatSchema = new Schema(
  {
    history: {
      type: [messageSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default model('Chat', chatSchema);
