import Chat from './models/Chat';
import Participant from './models/Participant';
import Message from './models/Message';
import mongoose, { ObjectId } from 'mongoose';

export class ChatService {
  public async createChat(participants: string[]): Promise<any> {
    const chat = new Chat({ participants });
    await chat.save();
    return chat;
  }

  public async addMessage(text: string, sender: string, chat: string): Promise<any> {
    console.log('Service addMessage:', { text, sender, chat }); 
    const message = new Message({ text, sender, chat });
    await message.save();

    // Update the lastMessage field in the Chat document
    await Chat.findByIdAndUpdate(chat, { lastMessage: message._id });

    return message;
  }


  public async getAllMessages(chatId: string): Promise<any> {
    const messages = await Message.find({ chat: chatId }).populate('sender', 'username');
    return messages;
  }
  
  public async addParticipant(username: string, conversations: string[]): Promise<any> {
    const participant = new Participant({ username, conversations });
    await participant.save();
    return participant;
  }

  public async getChats(): Promise<any> {
    const chats = await Chat.find().populate('participants').populate('lastMessage');
    return chats;
  }

  public async getChatById(chatId: string): Promise<any> {
    const chat = await Chat.findById(chatId).populate('participants').populate('lastMessage');
    return chat;
  }

  public async addParticipantToChat(chatId: string, userId: string): Promise<any> {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      throw new Error('Chat not found');
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    if (!chat.participants.includes(objectId)) {
      chat.participants.push(objectId);
      await chat.save();
    } 

    return chat;
  }
}
