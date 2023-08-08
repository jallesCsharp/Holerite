import { TResponse } from '../../provider/@types/http';
import AbstractService from '../../provider/services/abstractService';
import { apiUrl } from '../shared/apis/api';
export default class ArquivoService extends AbstractService {
  constructor() {
    super(apiUrl, '');
  }

  public async GetLayoutArquivo() {
    return `${process.env.REACT_APP_API_URL + 'UploadCreateRegistration'}`;
  }

  public async UploadHolerite(data?: FormData): Promise<TResponse<FormData>> {
    console.log('UploadHolerite envio');
    console.log(data);
    const response = await apiUrl.post('/ArquivoDocumentos/Holerite', data);
    return response.data;
  }

  public async UploadArquivo(data?: FormData): Promise<TResponse<FormData>> {
    const response = await apiUrl.post('/UploadCreateRegistration/UploadCadastroGeral', data);
    return response.data;
  }
}
