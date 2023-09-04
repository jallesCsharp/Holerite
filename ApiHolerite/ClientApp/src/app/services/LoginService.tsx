import axios from 'axios';
import { TResponse } from '../../provider/@types/http';
import { LoginModel } from '../@types/model/LoginModel';
import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';

export default class LoginService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async authLogin(loginData: LoginModel): Promise<TResponse<LoginModel[]>> {
    try {
      const loginApiUrl =
        process.env.REACT_APP_API_URL +
        'Login/LoginAuth?Cpf=' +
        loginData.cpf +
        '&Password=' +
        loginData.password;
      const response = await axios.post(loginApiUrl);

      const arrLogin: Array<LoginModel> = response.data;
      // Usuário lodago
      const logado = Object.values(response)[1];
      if (logado) {
        return {
          success: true,
          data: arrLogin,
          errors: null,
        };
      } else {
        return {
          success: false,
          data: null,
          errors: 'Opa! Algo deu errado :( \n Usuário ou Senha incorretos.',
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        errors: error,
      };
    }
  }
}
