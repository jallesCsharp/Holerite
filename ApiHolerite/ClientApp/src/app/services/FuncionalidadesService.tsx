import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';
import { TResponse } from '../../provider/@types/http';
import { FuncionalidadesModel } from '../@types/model/FuncionalidadesModel';
import { FilterFuncionalidades } from '../@types/filters/FilterFuncionalidades';

export default class FuncionalidadesService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async GetAll(): Promise<TResponse<FuncionalidadesModel[]>> {
    try {
      const response = await apiUrl.get('/FuncionalidadesModel');

      const data: Array<FuncionalidadesModel> = response.data;
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

  public async GetFuncionalidades(
    filter: FilterFuncionalidades,
  ): Promise<TResponse<FuncionalidadesModel[]>> {
    try {
      let param = '';

      console.log(filter);

      if (
        filter.Ativo === null &&
        filter.Id === null &&
        filter.Menu === null &&
        filter.Modulo === null &&
        filter.NomePerfil !== null
      ) {
        param = `?NomePerfil=${filter.NomePerfil}`;
      }

      console.log('Funcionalidades - param');
      console.log(param);

      const response = await apiUrl.get('/Funcionalidades' + param);

      console.log('Funcionalidades - response');
      console.log(response);

      const data: Array<FuncionalidadesModel> = response.data;
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
