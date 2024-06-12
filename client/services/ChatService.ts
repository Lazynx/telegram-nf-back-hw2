import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

class ChatService {
  async getUserChats() {
    const response = await axios.get(`${API_URL}/chats`, {
    //   params: { userId }
    });
    return response.data;
  }

  async createChat(participants: string[]) {
    const response = await axios.post(`${API_URL}/chats`, {
      participants
    });
    return response.data;
  }
}

export default new ChatService();
