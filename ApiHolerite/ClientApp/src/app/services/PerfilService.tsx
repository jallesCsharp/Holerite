import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';
import { TResponse } from '../../provider/@types/http';
import { PerfilModel } from '../@types/model/PerfilModel';

export default class PerfilService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async UpdatePerfil(model?: PerfilModel): Promise<TResponse<PerfilModel>> {
    const response = await apiUrl.put('/Perfil', model);
    return {
      success: response.data,
      data: null,
      errors: null,
    };
  }

  public async GetPerfil(): Promise<TResponse<PerfilModel[]>> {
    try {
      const response = await apiUrl.get('/Perfil/GetPerfil');

      const data: Array<PerfilModel> = response.data;
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

  public async InsertPerfil(data?: PerfilModel): Promise<TResponse<PerfilModel>> {
    const response = await apiUrl.post('/Perfil', data);
    return response.data;
  }

  public async DeletePerfil(model?: PerfilModel): Promise<TResponse<PerfilModel>> {
    const response = await apiUrl.delete(`Perfil/id:length(24)?id=${model?.id}`);
    return {
      success: response.data,
      data: null,
      errors: null,
    };
  }
}
