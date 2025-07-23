import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
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