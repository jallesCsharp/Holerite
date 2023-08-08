export class ConfigService {
  static getHeaders() {
    return {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('authToken'),
      },
    };
  }
}
