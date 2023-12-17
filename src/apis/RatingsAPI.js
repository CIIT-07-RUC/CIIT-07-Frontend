import api from './axios';

export class RatingsAPI {
  static async getAll(tconst) {
    const response = await api.get('/ratings/' + tconst);
    return response.data;
  }

  static async getOne(tconst) {
    const response = await api.get('/ratings/' + tconst + '/mycomment');
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
