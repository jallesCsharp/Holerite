import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';
import { TResponse } from '../../provider/@types/http';
import { ProfissoesModel } from '../@types/model/ProfissoesModel';
// import { User } from '../../provider/redux/@types/auth';

export default class EmpresasService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async Create(data?: ProfissoesModel): Promise<TResponse<ProfissoesModel>> {
    const response = await apiUrl.post('/Profissoes', data);
    return response.data;
  }

  public async Update(data?: ProfissoesModel): Promise<TResponse<ProfissoesModel>> {
    const response = await apiUrl.put('/Profissoes', data);
    return response.data;
  }

  public async getProfissoes(): Promise<TResponse<ProfissoesModel[]>> {
    try {
      const response = await apiUrl.get('/Profissoes');

      const data: Array<ProfissoesModel> = response.data;
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
