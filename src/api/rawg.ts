import axios from 'axios';

const API_KEY = '37cbf85f155743268c201803bb98fb6c';
const BASE_URL = 'https://api.rawg.io/api';

const rawgApi = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const searchGames = async (query: string) => {
  try {
    const response = await rawgApi.get('/games', {
      params: {
        search: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

export default rawgApi;