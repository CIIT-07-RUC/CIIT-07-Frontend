import api from './axios';

export class BookmarksAPI {
  static async getAll() {
    const response = await api.get('/bookmarks');
    return response.data;
  }

  static async getOne(id) {
    const response = await api.get('/bookmarks/' + id);
    return response.data;
  }

  static async create(value) {
    const response = await api.post('/bookmarks', value);
    return response.data;
  }

  static async update(id, value) {
    const response = await api.put('/bookmarks/' + id, value);
    return response.data;
  }

  static async delete(id) {
    const response = await api.delete('/bookmarks/' + id);
    return response.data;
  }

  static async deleteAll() {
    const response = await api.delete('/bookmarks');
    return response.data;
  }
}

export default BookmarksAPI;
