import { useHistory } from 'react-router-dom';
import AbstractController from '../../../../../provider/services/abstractController';
// import ToastService from '../../../../../provider/services/toastService';
import ArquivoService from '../../../../services/ArquivoService';
// import { Mensagem } from '../../../../shared/mensagem/Mensagem';
import ArquivosFilter from '../models/ArquivosFilter';
import { MesExt } from '../../../../@types/enums/Mes';

export default class ArquivosHoleriteController extends AbstractController {
  public filter: ArquivosFilter;

  history = useHistory();

  private arquivoService = new ArquivoService();

  constructor(filter: ArquivosFilter) {
    super();
    this.filter = filter;
    this.history = useHistory();
  }

  init() {
    super.init();
    this.CarregarTela();
    this.breadCrumbService.change([
      {
        label: 'Holerite',
        id: 'holerite-arquivo',
      },
    ]);
  }

  public CarregarTela() {
    this.filter.setListaMes(MesExt.GetMes());
  }

  public getArquivosHolerite() {
    this.blockUIService.start();
    // @ts-ignore
    const filter: ArquivosFilter = {};
    if (this.filter.pessoaNome) {
      filter.pessoaNome = this.filter.pessoaNome;
    }
    if (this.filter.mes) {
      filter.mes = this.filter.mes;
    }
    if (this.filter.dataInicio) {
      filter.dataInicio = this.filter.dataInicio;
    }
    if (this.filter.dataFim) {
      filter.dataFim = this.filter.dataFim;
    }
    this.blockUIService.stop();
  }

  public SelecionarMes(idMes: number) {
    this.filter.setMes(idMes);
  }

  public GetAllListaPessoas() {
    try {
      console.log('Lista Pessoas');
      // this.blockUIService.start();
      // await this.arquivoService.UploadHolerite(formFile).then((result) => {
      //   console.log(result);
      //   if (result.success == false) {
      //     ToastService.showError(result.errors);
      //     return;
      //   }
      //   return result.data;
      // });
      // await this.limparFilter();
      // this.blockUIService.stop();
    } catch (error) {
      // ToastService.showError(Mensagem.ERROR_501);
      // await this.limparFilter();
      // this.blockUIService.stop();
    }
  }

  public selecionarEmpresa(idMes: string) {
    this.filter.setMes(idMes);
  }

  //   public async limparFilter() {}

  public voltaNav() {
    //this.history.goBack();
  }

  public limpar() {
    //this.history.goBack();
  }
}
