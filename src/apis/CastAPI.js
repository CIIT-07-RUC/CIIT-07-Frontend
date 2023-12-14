import api from './axios';

export class CastAPI {
  static async getById(id) {
    const response = await api.get('/cast/' + id);
    return response.data;
  }
}

export default CastAPI;
