import { useHistory } from 'react-router-dom';
// import { PaisViewModel } from '../../../../@types/model/PaisViewModel';
import HistoricoAlteracaoInstalacaoFilter from '../models/HistoricoAlteracaoInstalacaoFilter';
import { FiltroAlteracaoInstalacaoViewModel } from '../../../../@types/filters/FiltroAlteracaoInstalacaoViewModel';
// import { ComboViewModel } from '../../../../@types/model/ComboViewModel';
// import { Utils } from '../../../../shared/utils/Utils';
// import ToastService from '../../../../../provider/services/toastService';
import AbstractController from '../../../../../provider/services/abstractController';

export default class HistoricoAlteracaoInstalacaoController extends AbstractController {
  // private _ufService = new UfService();

  // private _municipioService = new MunicipioService();

  // private _paisService = new PaisService();

  // private _instacacaoService = new InstalacaoesService();

  public filter: HistoricoAlteracaoInstalacaoFilter;

  // private _scaService = new ScaService();

  history = useHistory();

  constructor(filter: HistoricoAlteracaoInstalacaoFilter) {
    super();
    this.filter = filter;
    this.history = useHistory();
  }

  // get paisService(): PaisService {
  //   return this._paisService;
  // }

  // get scaService(): ScaService {
  //   return this._scaService;
  // }

  init() {
    super.init();
    this.comboPais();
    this.comboUf();
    this.comboCampos();
    this.getRelatorio();
    this.breadCrumbService.change([
      { label: 'Histórico de Alterações da Instalação', id: 'relatorio-hisotrico-instalacao' },
    ]);
  }

  public limpar() {
    this.filter.setUf(null);
    this.filter.setMunicipio(null);
    this.filter.setPais(null);
    this.filter.setNomeEmpresa('');
    this.filter.setNomeInstalacao('');
    this.filter.setCampo(null);
    this.filter.setNomeUsuario('');
  }

  public selecionarPais(idPais: number) {
    this.filter.setPais(idPais);
    this.filter.setUf(null);
    this.filter.setMunicipio(null);
    // this.filter.setListaUf([]);
    this.filter.setListaMunicipio([]);
    // this.comboUf(idPais);
  }

  public selecionarUf(IdUf: number) {
    this.filter.setUf(IdUf);
    this.filter.setMunicipio(null);
    this.filter.setListaMunicipio([]);
    this.comboMunicipio();
  }

  public getRelatorio() {
    const filter: FiltroAlteracaoInstalacaoViewModel = {};
    if (this.filter.nomeInstalacao) {
      filter.NomeInstalacao = this.filter.nomeInstalacao;
    }
    if (this.filter.nomeEmpresa) {
      filter.NomeEmpresa = this.filter.nomeEmpresa;
    }
    if (this.filter.nomeUsuario) {
      filter.NomeUsuario = this.filter.nomeUsuario;
    }
    if (this.filter.campo) {
      filter.CampoAlterado = this.filter.campo;
    }
    if (this.filter.pais) {
      filter.IdPais = this.filter.pais;
    }
    if (this.filter.uf) {
      filter.IdUF = this.filter.uf;
    }
    if (this.filter.municipio) {
      filter.IdMunicipio = this.filter.municipio;
    }

    // this._instacacaoService
    //   .getHistoricoAlteracaoInstacao(filter)
    //   .then((res) => {
    //     this.blockUIService.stop();
    //     if (res.success === true && res.result) {
    //       this.filter.setGrid(res.result);
    //     } else if (res.success === true && !res.result) {
    //       this.filter.setGrid([]);
    //     } else {
    //       ToastService.showError(res.msg);
    //     }
    //   })
    //   .catch((err) => {
    //     this.blockUIService.stop();
    //     ToastService.showError(err.msg);
    //   });
  }

  public comboCampos() {
    this.blockUIService.start();
    // this._instacacaoService
    //   .getComboColunasInstalacao()
    //   .then((res) => {
    //     this.blockUIService.stop();
    //     if (res.success === true && !!res.result && res.result.length > 0) {
    //       const list: ComboViewModel[] = res.result;
    //       this.filter.setListaCampos(list);
    //     } else {
    //       ToastService.showError(res.msg);
    //     }
    //   })
    //   .catch((err) => {
    //     this.blockUIService.stop();
    //     ToastService.showError(err.msg);
    //   });
  }

  public comboPais() {
    this.blockUIService.start();
    // this._paisService
    //   .getListaPais()
    //   .then((res) => {
    //     this.blockUIService.stop();
    //     if (res.success === true && !!res.result && res.result.length > 0) {
    //       const list: PaisViewModel[] = JSON.parse(res.result);
    //       const listCombo = list.map((pais: PaisViewModel) => {
    //         return { name: Utils.primeiraLetraCaixaAlta(pais.NomePais), value: pais.IdPais };
    //       });
    //       this.filter.setListaPais(listCombo);
    //     } else {
    //       ToastService.showError(res.msg);
    //     }
    //   })
    //   .catch((err) => {
    //     this.blockUIService.stop();
    //     ToastService.showError(err.msg);
    //   });
  }

  public comboUf() {
    this.blockUIService.start();
    // this._ufService
    //   .getComboUf(idPais)
    //   .then((res) => {
    //     this.blockUIService.stop();
    //     if (res.success === true && !!res.result && res.result.length > 0) {
    //       this.filter.setListaUf(res.result);
    //     } else {
    //       ToastService.showError(res.msg);
    //     }
    //   })
    //   .catch((err) => {
    //     this.blockUIService.stop();
    //     ToastService.showError(err.msg);
    //   });
  }

  public comboMunicipio() {
    this.blockUIService.start();
    // this._municipioService
    //   .getComboMunicipio(idMunicipio)
    //   .then((res) => {
    //     this.blockUIService.stop();
    //     if (res.success === true && !!res.result && res.result.length > 0) {
    //       this.filter.setListaMunicipio(res.result);
    //     } else {
    //       ToastService.showError(res.msg);
    //     }
    //   })
    //   .catch((err) => {
    //     this.blockUIService.stop();
    //     ToastService.showError(err.msg);
    //   });
  }
}
