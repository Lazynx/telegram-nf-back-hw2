import mongoose, { Document, Schema } from 'mongoose';

interface IChat extends Document {
  participants: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
}

const ChatSchema: Schema = new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'Participant', required: true }],
  lastMessage: { type: Schema.Types.ObjectId, ref: 'Message', required: false },
});

const Chat = mongoose.model<IChat>('Chat', ChatSchema);

export default Chat;
export { IChat };
