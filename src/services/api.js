import axios from 'axios';

// MockAPI'deki kendi projemizin adresi
const API_BASE_URL = 'https://6a7dab00f8b2ed99ca4ea242.mockapi.io/pets';

export const petService = {
  // Tüm hayvanları çeken fonksiyon
  getAnimals: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('API Hatası:', error);
      return [];
    }
  }
};