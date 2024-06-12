import { Request, Response } from 'express';
import { ChatService } from './сhat-service';

export class ChatController {
  constructor(private chatService: ChatService) {}

  public createChat = async (req: Request, res: Response): Promise<void> => {
    const { participants } = req.body;
    try {
      const chat = await this.chatService.createChat(participants);
      res.json(chat);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };

  public addMessage = async (req: Request, res: Response): Promise<void> => {
    const { text, sender, chat } = req.body;
    console.log('Request body:', req.body); 
    try {
      const message = await this.chatService.addMessage(text, sender, chat);
      res.json(message);
    } catch (error) {
      console.error('Error adding message:', error);
      res.status(500).send(error);
    }
  };

  public addParticipant = async (req: Request, res: Response): Promise<void> => {
    const { username, conversations } = req.body;
    try {
      const participant = await this.chatService.addParticipant(username, conversations);
      res.json(participant);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };

  public getChats = async (req: Request, res: Response): Promise<void> => {
    try {
      const chats = await this.chatService.getChats();
      res.json(chats);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };

  public getChatById = async (req: Request, res: Response): Promise<void> => {
    const { chatId } = req.params;
    try {
      const chat = await this.chatService.getChatById(chatId);
      if (chat) {
        res.json(chat);
      } else {
        res.status(404).send('Chat not found');
      }
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };

  public getAllMessages = async (req: Request, res: Response): Promise<void> => {
    const { chatId } = req.params;
    try {
      const messages = await this.chatService.getAllMessages(chatId);
      res.json(messages);
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };
}

export default ChatController;
