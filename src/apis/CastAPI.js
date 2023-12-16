import api from './axios';

export class CastAPI {
  static async getById(id) {
    const response = await api.get('/cast/' + id);
    return response.data;
  }

  static async getAllCoplayers(castKeyword) {
    const response = await api.get('/cast/coplayers/' + castKeyword);
    return response.data;
  }

  static async getAllCast(movieTitle) {
    const response = await api.get('/cast/fullcast/' + movieTitle);
    return response.data;
  }
}

export default CastAPI;
