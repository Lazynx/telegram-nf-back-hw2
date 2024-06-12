import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  text: string;
  sender: mongoose.Types.ObjectId;
  chat: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true }, 
  },
  { timestamps: true }
);

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
export { IMessage };
