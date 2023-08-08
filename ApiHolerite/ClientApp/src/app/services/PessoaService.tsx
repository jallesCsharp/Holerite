import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';
import { TResponse } from '../../provider/@types/http';
import { User } from '../../provider/redux/@types/auth';

export default class PessoaService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async getPessoas(): Promise<TResponse<User[]>> {
    try {
      const response = await apiUrl.get('/Pessoas/Pessoas');

      const data: Array<User> = response.data;
      const resultTrue = Object.values(response)[1];

      if (resultTrue) {
        return {
          success: true,
          data: data,
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
