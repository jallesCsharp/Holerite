import axios from 'axios';
import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';
import { TResponse } from '../../provider/@types/http';
import { CepModel } from '../@types/model/CepModel';

export default class CepService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public getCepp(cep: string): Promise<TResponse<any>> {
    return this.api
      .get(`${process.env.REACT_APP_CEP_URL}/${cep}/json`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      })
      .then((resp) => {
        const data: TResponse<any> = resp.data;
        const dados: CepModel = JSON.parse(data.data);
        return { result: dados, success: data.success, msg: data.errors };
      })
      .catch((resp) => resp.data);
  }

  public async getCep(cep?: string): Promise<TResponse<CepModel[]>> {
    try {
      const cepApiUrl = process.env.REACT_APP_CEP_URL + '/' + cep + '/json';
      const response = await axios.get(cepApiUrl);

      const data: Array<CepModel> = response.data;
      const resultTrue = Object.values(response)[5];

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
        errors: 'Erro ao executar ação',
      };
    }
  }
}
