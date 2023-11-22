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

  public async UploadHolerite(data?: FormData): Promise<TResponse<any>> {
    const response = await apiUrl.post('/ArquivoDocumentos/Holerite', data);
    return response.data;
  }

  public async UploadArquivo(data?: FormData): Promise<TResponse<FormData>> {
    const response = await apiUrl.post('/UploadCreateRegistration/UploadCadastroGeral', data);
    return response.data;
  }

  public async ConfirmarEnvioEmailPendentes(data?: ArquivosModel[]) {
    const response = await apiUrl.post('/Arquivos/ConfirmarEnvioEmailPendentes', {
      arquivos: data,
    });
    return response.data;
  }

  public async ReenviarEmail(data?: ArquivosModel) {
    const response = await apiUrl.post('/Arquivos/ReenviarEmail', {
      arquivos: data,
    });
    return response.data;
  }

  public async getArquivoHolerite(id: number): Promise<TResponse<ArquivosModel>> {
    try {
      const response = await apiUrl.get(`/Arquivos/GetArquivoHolerite?Id=${id}`);
      const data: ArquivosModel = response.data[0];
      return {
        success: true,
        data: data,
        errors: null,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        errors: error,
      };
    }
  }

  public async getPesquisarArquivos(
    filter: FilterArquivosHolerite,
  ): Promise<TResponse<ArquivosModel[]>> {
    try {
      let param = '';

      if (
        filter.Mes === 0 &&
        filter.Id === null &&
        filter.Nome === null &&
        filter.PessoaId !== null
      ) {
        param = `?PessoaId=${filter.PessoaId}`;
      }
      if (
        filter.Mes !== 0 &&
        filter.Id === null &&
        filter.Nome === null &&
        filter.PessoaId === null
      ) {
        param = `?Mes=${filter.Mes}`;
      }
      if (
        filter.Mes === 0 &&
        filter.Id === null &&
        filter.Nome !== null &&
        filter.PessoaId != null
      ) {
        param = `?PessoaId=${filter.PessoaId}&Nome=${filter.Nome}`;
      }
      if (
        filter.Mes !== 0 &&
        filter.Id === null &&
        filter.Nome !== null &&
        filter.PessoaId !== null
      ) {
        param = `?Mes=${filter.Mes}&PessoaId=${filter.PessoaId}&Nome=${filter.Nome}`;
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
