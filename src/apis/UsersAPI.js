import api from './axios';

export class UsersAPI {
  static async login(email, password) {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  }

  static async register(email, password) {
    const response = await api.post('/users', { email, password, PasswordConfirmation: password });
    return response.data;
  }

  static async getAll() {
    const response = await api.get('/users');
    return response.data;
  }

  static async getById(id) {
    const response = await api.get('/users/' + id);
    return response.data;
  }

  static async updateUser(id, userInfo) {
    const response = await api.put('/users/' + id, userInfo);
    return response.data;
  }

  static async addInformation(userInfo) {
    const response = await api.post('/users/add-information', userInfo);
    return response.data;
  }

  static async deactivateAccount() {
    const response = await api.post('/users/deactivate-account');
    return response.data;
  }

  static async delete(id) {
    const response = await api.delete('/users/' + id);
    return response.data;
  }
}

export default UsersAPI;
