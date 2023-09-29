import { useHistory } from 'react-router-dom';
import AbstractController from '../../../../../provider/services/abstractController';
import ToastService from '../../../../../provider/services/toastService';
import { Mensagem } from '../../../../shared/mensagem/Mensagem';
import ArquivosDocumentosFilter from '../models/ArquivosDocumentosFilter';
import ArquivosDocumentosService from '../../../../services/ArquivosDocumentosService';
import { FilterArquivosDocumentos } from '../../../../@types/filters/FilterArquivosDocumentos';

export default class ListaArquivosImportadosController extends AbstractController {
  public filter: ArquivosDocumentosFilter;

  history = useHistory();

  private arquivosDocumentosService = new ArquivosDocumentosService();

  constructor(filter: ArquivosDocumentosFilter) {
    super();
    this.filter = filter;
    this.history = useHistory();
  }

  async init() {
    super.init();
    await this.PesquisarArquivosDoc();
    this.breadCrumbService.change([
      {
        label: 'Holerite Pendente de Envio',
        id: 'holerite-pendentes',
      },
    ]);
  }

  public visulizarHol = (arquivo?: any) => {
    this.filter.setOnVisualizar(true);
    this.filter.setArquivosDocumentosModel(arquivo);
  };

  public modalOnFechar = () => {
    this.filter.setOnVisualizar(false);
    this.filter.setArquivosDocumentosModel(null);
  };

  public async PesquisarArquivosDoc() {
    try {
      this.blockUIService.start();
      let filter: FilterArquivosDocumentos = {
        Id: null,
        Nome: null,
        DataInicio: null,
        DataFim: null,
      };
      await this.arquivosDocumentosService.getPesquisarArquivosDocumentos(filter).then((result) => {
        if (result.success == false) {
          ToastService.showError(
            'Error: ' + result.errors.status + ' - ' + result.errors.data.errors.Messagens[0],
          );
          return;
        }
        if (result.data?.toString() === '400') {
          ToastService.showError(Mensagem.ERROR_400);
          return;
        }
        this.filter.setListaArquivosDocumentosModel(result.data);
        return result.data;
      });
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501 + error);
      this.blockUIService.stop();
    }
  }

  public async EcluirArquivosDoc(item: any) {
    try {
      this.blockUIService.start();
      await this.arquivosDocumentosService.Delete(item).then((result) => {
        if (result.success == false) {
          ToastService.showError(
            'Error: ' + result.errors.status + ' - ' + result.errors.data.errors.Messagens[0],
          );
          return;
        }
        if (result.data?.toString() === '400') {
          ToastService.showError(Mensagem.ERROR_400);
          return;
        }
        this.filter.setListaArquivosDocumentosModel(result.data);
        return result.data;
      });
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501 + error);
      this.blockUIService.stop();
    }
  }
}
