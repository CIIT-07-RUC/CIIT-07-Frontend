import api from './axios';

export class SearchAPI {
  static async searchByTitle(value) {
    const response = await api.get('/search/title/' + value);
    return response.data;
  }

  static async searchByPersonName(value) {
    const response = await api.get('/search/person/' + value);
    return response.data;
  }

  static async searchTitleByKeyword(value) {
    const response = await api.get('/search/' + value);
    return response.data;
  }
}

export default SearchAPI;
