import axios from 'axios';
import { TResponse } from '../../provider/@types/http';
import { LoginModel } from '../@types/model/LoginModel';

export class LoginService {
  public async authLogin(loginData: LoginModel): Promise<TResponse<LoginModel[]>> {
    try {
      const loginApiUrl =
        process.env.REACT_APP_API_URL +
        '/Login/LoginAuth?Cpf=' +
        loginData.Cpf +
        '&Senha=' +
        loginData.Senha;
      const response = await axios.post(loginApiUrl);

      const arrLogin: Array<LoginModel> = response.data;
      // Usuário lodago
      const logado = Object.values(response)[5];
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
