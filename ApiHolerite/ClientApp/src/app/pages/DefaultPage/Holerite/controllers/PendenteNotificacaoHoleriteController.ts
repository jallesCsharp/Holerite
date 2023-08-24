import { useHistory } from 'react-router-dom';
import AbstractController from '../../../../../provider/services/abstractController';
import ArquivoService from '../../../../services/ArquivoService';
import ArquivosFilter from '../models/ArquivosFilter';
import ToastService from '../../../../../provider/services/toastService';
import { Mensagem } from '../../../../shared/mensagem/Mensagem';

export default class PendenteNotificacaoHoleriteController extends AbstractController {
  public filter: ArquivosFilter;

  history = useHistory();

  private arquivoService = new ArquivoService();

  constructor(filter: ArquivosFilter) {
    super();
    this.filter = filter;
    this.history = useHistory();
  }

  async init() {
    super.init();
    await this.getPesquisarArquivosPendentes(false);
    this.breadCrumbService.change([
      {
        label: 'Holerite Pendente de Envio',
        id: 'holerite-pendentes',
      },
    ]);
  }

  public async ConfirmarEnvioEmail() {
    try {
      this.blockUIService.start();
      // console.log('this.filter.listaArquivos');
      // console.log(this.filter.listaArquivos);
      await this.arquivoService.ConfirmarEnvioEmail(this.filter.listaArquivos).then((result) => {
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
        this.filter.setListaArquivos(result.data);
        return result.data;
      });
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501 + error);
      this.blockUIService.stop();
    }
  }

  public SelecionarMes(idMes: any) {
    console.log('idMes');
    console.log(idMes);
    this.filter.setMes(idMes);
  }

  public async getPesquisarArquivosPendentes(filter: boolean) {
    try {
      this.blockUIService.start();
      await this.arquivoService.getPesquisarArquivosPendentes(filter).then((result) => {
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
        this.filter.setListaArquivos(result.data);
        return result.data;
      });
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501 + error);
      this.blockUIService.stop();
    }
  }
}
