import { TResponse } from '../../provider/@types/http';
import AbstractService from '../../provider/services/abstractService';
import { FilterArquivosDocumentos } from '../@types/filters/FilterArquivosDocumentos';
import { ArquivosDocumentosModel } from '../@types/model/ArquivosDocumentosModel';
import { apiUrl } from '../shared/apis/api';
export default class ArquivosDocumentosService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async getPesquisarArquivosDocumentos(
    filter: FilterArquivosDocumentos,
  ): Promise<TResponse<ArquivosDocumentosModel[]>> {
    try {
      let param = '';

      if (
        filter.Id === null &&
        filter.Nome === null &&
        filter.DataInicio !== null &&
        filter.DataFim !== null
      ) {
        param = `?DataInicio=${filter.DataInicio}&DataFim=${filter.DataFim}`;
      }
      if (
        filter.Id !== null &&
        filter.Nome === null &&
        filter.DataInicio === null &&
        filter.DataFim === null
      ) {
        param = `?Id=${filter.Id}`;
      }
      if (
        filter.Id === null &&
        filter.Nome !== null &&
        filter.DataInicio !== null &&
        filter.DataFim !== null
      ) {
        param = `?DataInicio=${filter.DataInicio}&DataFim=${filter.DataFim}&Nome=${filter.Nome}`;
      }

      const response = await apiUrl.get('/ArquivoDocumentos/GetArquivosDocumentos' + param);

      const data: Array<ArquivosDocumentosModel> = response.data;
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

  public async Delete(itemId?: any): Promise<TResponse<ArquivosDocumentosModel>> {
    const response = await apiUrl.delete(`ArquivoDocumentos/${itemId}`);
    return {
      success: response.data,
      data: null,
      errors: null,
    };
  }
}
