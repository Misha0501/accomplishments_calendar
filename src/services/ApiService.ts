import axios from 'axios';
import { type Day } from '@/types';

interface ApiGETResponse {
  message: string;
  days: Day[];
}

const API_URL = 'http://localhost:3000/api/days';

class ApiService {
  static async getDays(): Promise<Day[]> {
    const response = await axios.get<ApiGETResponse>(API_URL);
    return response.data.days;
  }

  static async togglexDay(id: string): Promise<void> {
    await axios.post(`${API_URL}/toggle`, { _id : id });
  }
}

export default ApiService;