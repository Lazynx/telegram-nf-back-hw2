import mongoose, { Document, Schema } from 'mongoose';

interface IParticipant extends Document {
  username: string;
  conversations: mongoose.Types.ObjectId[];
  lastOnline: Date;
}

const ParticipantSchema: Schema = new Schema({
  username: { type: String, required: true },
  conversations: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  lastOnline: { type: Date, default: Date.now },
});

const Participant = mongoose.model<IParticipant>('Participant', ParticipantSchema);

export default Participant;
export { IParticipant };
