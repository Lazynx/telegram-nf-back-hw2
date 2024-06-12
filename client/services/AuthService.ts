import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Убедитесь, что этот URL правильный

interface LoginResponse {
  user: {
    _id: string;
    email: string;
    username: string;
  };
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  async login(email: string, password: string, username: string): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
      email,
      username,
      password,
    });
    return response.data;
  }
}

export default new AuthService();
