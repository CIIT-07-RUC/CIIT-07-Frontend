import api from './axios';

export class MovieAPI {
  static async getById(id) {
    const response = await api.get('/movie/' + id);
    return response.data;
  }

  static async getSimilar(id) {
    const response = await api.get('/movie/' + id + '/similar');
    return response.data;
  }
}

export default MovieAPI;
