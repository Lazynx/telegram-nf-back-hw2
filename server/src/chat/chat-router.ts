import { Router } from 'express';
import ChatController from './сhat-сontroller';
import { ChatService } from './сhat-service';

const chatRouter = Router();

const chatService = new ChatService();
const chatController = new ChatController(chatService);

chatRouter.post('/chats', chatController.createChat);
chatRouter.post('/messages', chatController.addMessage);
chatRouter.post('/participants', chatController.addParticipant);
chatRouter.get('/chats', chatController.getChats); 
chatRouter.get('/chats/:chatId', chatController.getChatById); 
chatRouter.get('/chats/:chatId/messages', chatController.getAllMessages); 

export default chatRouter;
