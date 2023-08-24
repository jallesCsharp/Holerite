import { TResponse } from '../../provider/@types/http';
import AbstractService from '../../provider/services/abstractService';
import { FilterArquivosHolerite } from '../@types/filters/FilterArquivosHolerite';
import { ArquivosModel } from '../@types/model/ArquivosModel';
import { apiUrl } from '../shared/apis/api';
export default class ArquivoService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async GetLayoutArquivo() {
    return `${process.env.REACT_APP_API_URL + 'UploadCreateRegistration'}`;
  }

  public async UploadHolerite(data?: FormData): Promise<TResponse<FormData>> {
    const response = await apiUrl.post('/ArquivoDocumentos/Holerite', data);
    return response.data;
  }

  public async UploadArquivo(data?: FormData): Promise<TResponse<FormData>> {
    const response = await apiUrl.post('/UploadCreateRegistration/UploadCadastroGeral', data);
    return response.data;
  }

  public async ConfirmarEnvioEmail(data?: ArquivosModel[]) {
    console.log('ConfirmarEnvioEmail');
    console.log(data);
    const response = await apiUrl.post('/Arquivos/Confirmar', { arquivos: data });
    return response.data;
  }

  public async getPesquisarArquivos(
    filter: FilterArquivosHolerite,
  ): Promise<TResponse<ArquivosModel[]>> {
    try {
      let param = '';

      if (filter.Mes !== undefined) {
        param = `?Mes=${filter.Mes}`;
      }
      if (filter.Mes === undefined && filter.Id !== null && filter.Nome !== null) {
        param = `?Id=${filter.Id}&Nome=${filter.Nome}`;
      }
      if (filter.Mes !== undefined && filter.Id !== null && filter.Nome !== null) {
        param = `?Mes=${filter.Mes}&Id=${filter.Id}&Nome=${filter.Nome}`;
      }
      if (
        filter.EmailEnviado !== undefined &&
        filter.Mes === 0 &&
        filter.Id === null &&
        filter.Nome === null
      ) {
        param = `?EmailEnviado=${filter.EmailEnviado}`;
      }

      const response = await apiUrl.get('/Arquivos/GetPesquisarArquivos' + param);

      const data: Array<ArquivosModel> = response.data;
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

  public async getPesquisarArquivosPendentes(
    emailEnviado: boolean,
  ): Promise<TResponse<ArquivosModel[]>> {
    try {
      let param = `?EmailEnviado=${emailEnviado}`;

      const response = await apiUrl.get('/Arquivos/GetPesquisarArquivosPendentes' + param);

      const data: Array<ArquivosModel> = response.data;
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
