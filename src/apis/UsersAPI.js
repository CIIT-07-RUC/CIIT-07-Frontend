import api from './axios';

export class UsersAPI {
  static async login(email, password) {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  }

  static async register(email, password, passwordConfirmation) {
    const response = await api.post('/users', { email, password, passwordConfirmation });
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
    const response = await api.put('/users/' + id, userInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
      });
    
    return response.data;
  }

  static async addInformation(id, userInfo) {
    const response = await api.post('/users/add-information/79', userInfo, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  }

  static async deactivateAccount(jwtToken) {
    const response = await api.post('/users/deactivate-account',{  headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
  });
    return response.data;
  }

  static async delete(id) {
    const response = await api.delete('/users/' + id);
    return response.data;
  }
}

export default UsersAPI;
