import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';
import { TResponse } from '../../provider/@types/http';
import { GrupoModel } from '../@types/model/GrupoModel';

export default class CepService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async UpdateGrupos(grupo?: GrupoModel): Promise<TResponse<GrupoModel>> {
    const response = await apiUrl.put('/Grupos', grupo);
    console.log(response);
    return {
      success: response.data,
      data: null,
      errors: null,
    };
  }

  public async GetGrupos(): Promise<TResponse<GrupoModel[]>> {
    try {
      const response = await apiUrl.get('/Grupos/GetGrupos');

      const data: Array<GrupoModel> = response.data;
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

  public async InsertGrupo(data?: GrupoModel): Promise<TResponse<GrupoModel>> {
    debugger;
    const response = await apiUrl.post('/Grupos', data);
    return response.data;
  }

  public async DeleteGrupos(grupo?: GrupoModel): Promise<TResponse<GrupoModel>> {
    const response = await apiUrl.delete(`Grupos/id:length(24)?id=${grupo?.id}`);
    return {
      success: response.data,
      data: null,
      errors: null,
    };
  }
}
