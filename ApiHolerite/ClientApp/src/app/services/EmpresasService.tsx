import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';
import { TResponse } from '../../provider/@types/http';
// import { User } from '../../provider/redux/@types/auth';
import { EmpresaModel } from '../@types/model/EmpresaModel';

export default class EmpresasService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async Create(data?: EmpresaModel): Promise<TResponse<EmpresaModel>> {
    const response = await apiUrl.post('/Empresas', data);
    return response.data;
  }

  public async Update(data?: EmpresaModel): Promise<TResponse<EmpresaModel>> {
    const response = await apiUrl.put('/Empresas', data);
    return response.data;
  }

  public async getEmpresas(): Promise<TResponse<EmpresaModel[]>> {
    try {
      const response = await apiUrl.get('/Empresas');

      const data: Array<EmpresaModel> = response.data;
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
