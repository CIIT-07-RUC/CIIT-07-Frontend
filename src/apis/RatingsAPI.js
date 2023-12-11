import api from './axios';

export class RatingsAPI {
  static async getAll() {
    const response = await api.get('/ratings');
    return response.data;
  }

  static async getOne(id) {
    const response = await api.get('/ratings/' + id);
    return response.data;
  }

  static async create(value) {
    const response = await api.post('/ratings', value);
    return response.data;
  }

  static async delete(id) {
    const response = await api.delete('/ratings/' + id);
    return response.data;
  }
}

export default RatingsAPI;
