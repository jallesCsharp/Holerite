import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';
import { TResponse } from '../../provider/@types/http';
import { ControleAcessosModel } from '../@types/model/ControleAcessosModel';

export default class ControleAcessoService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async UpdatePerfil(
    model?: ControleAcessosModel,
  ): Promise<TResponse<ControleAcessosModel>> {
    const response = await apiUrl.put('/ControleAcessossssss', model);
    return {
      success: response.data,
      data: null,
      errors: null,
    };
  }

  public async GetAll(): Promise<TResponse<ControleAcessosModel[]>> {
    try {
      const response = await apiUrl.get('/ControleAcessos');

      const data: Array<ControleAcessosModel> = response.data;
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

  public async GetPerfil(): Promise<TResponse<ControleAcessosModel[]>> {
    try {
      const response = await apiUrl.get('/ControleAcessosssss');

      const data: Array<ControleAcessosModel> = response.data;
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

  public async InsertPerfil(data?: ControleAcessosModel): Promise<TResponse<ControleAcessosModel>> {
    const response = await apiUrl.post('/ControleAcessossssss', data);
    return response.data;
  }

  public async DeletePerfil(
    model?: ControleAcessosModel,
  ): Promise<TResponse<ControleAcessosModel>> {
    const response = await apiUrl.delete(`ControleAcessosssss/id:length(24)?id=${model?.id}`);
    return {
      success: response.data,
      data: null,
      errors: null,
    };
  }
}
