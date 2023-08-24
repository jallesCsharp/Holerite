import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';
import { TResponse } from '../../provider/@types/http';
// import { User } from '../../provider/redux/@types/auth';
import { PessoasModel } from '../@types/model/PessoasModel';

export default class PessoaService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async Create(data?: PessoasModel): Promise<TResponse<PessoasModel>> {
    console.log('Salvar Ficha Pessoa');
    console.log(data);
    const response = await apiUrl.post('/Pessoas', data);
    return response.data;
  }

  public async Update(data?: PessoasModel): Promise<TResponse<PessoasModel>> {
    console.log('Salvar Ficha Pessoa');
    console.log(data);
    const response = await apiUrl.put('/Pessoas', data);
    return response.data;
  }

  public async getPessoas(): Promise<TResponse<PessoasModel[]>> {
    try {
      const response = await apiUrl.get('/Pessoas');

      const data: Array<PessoasModel> = response.data;
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

  public async getPerfil(id: any): Promise<TResponse<PessoasModel>> {
    try {
      const response = await apiUrl.get(`/Pessoas?Id=${id}`);

      const data = response.data[0];
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
