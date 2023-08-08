import { useHistory } from 'react-router-dom';
import InstalacaoEmpresaFilter from '../models/InstalacaoEmpresaFilter';
import { FiltroInstalacaoEmpresaViewModel } from '../../../../@types/filters/FiltroInstalacaoEmpresaViewModel';
import AbstractController from '../../../../../provider/services/abstractController';

export default class InstalacaoEmpresaController extends AbstractController {
  // private _ufService = new UfService();

  // private _municipioService = new MunicipioService();

  // private _paisService = new PaisService();

  // private _instacacaoService = new InstalacaoesService();
  // private _scaService = new ScaService();

  public filter: InstalacaoEmpresaFilter;

  history = useHistory();

  constructor(filter: InstalacaoEmpresaFilter) {
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
    this.comboSituacao();
    this.getRelatorioInstacaoEmpresa();
    this.breadCrumbService.change([
      { label: 'Relatório de Instalações por Empresa', id: 'relatorio-instalacao-empresa' },
    ]);
  }

  public getRelatorioInstacaoEmpresa() {
    // @ts-ignore
    const filter: FiltroInstalacaoEmpresaViewModel = {};
    if (this.filter.nomeEmpresa) {
      filter.NomeEmpresa = this.filter.nomeEmpresa;
    }
    if (this.filter.nomeInstalacao) {
      filter.NomeInstalacao = this.filter.nomeInstalacao;
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
    if (this.filter.situacaoEmpresa) {
      filter.SituacaoEmpresa = this.filter.situacaoEmpresa;
    }
    if (this.filter.situacaoInstalacao) {
      filter.SituacaoInstalacao = this.filter.situacaoInstalacao;
    }

    this.blockUIService.start();
    this.blockUIService.stop();
    // this._instacacaoService
    //   .getRelatorioInstacaoEmpresa(filter)
    //   .then((res) => {
    //     this.blockUIService.stop();
    //     if (res.success === true) {
    //       this.filter.setGrid(res.result);
    //     } else {
    //       ToastService.showError(res.msg);
    //     }
    //   })
    //   .catch((err) => {
    //     this.blockUIService.stop();
    //     ToastService.showError(err.msg);
    //   });
  }

  public limpar() {
    this.filter.setUf(null);
    this.filter.setMunicipio(null);
    this.filter.setPais(null);
    this.filter.setNomeEmpresa('');
    this.filter.setNomeInstalacao('');
    this.filter.setSituacaoEmpresa(null);
    this.filter.setSituacaoInstalacao(null);
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
  }

  public comboSituacao() {
    this.blockUIService.start();
    // this._instacacaoService
    //   .getComboTipoSituacaoEmpresa()
    //   .then((res) => {
    //     this.blockUIService.stop();
    //     if (res.success === true && !!res.result && res.result.length > 0) {
    //       const list: ComboViewModel[] = res.result;
    //       this.filter.setListaSituacaoEmpresa(list);
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
    //   .catch(() => {
    //     this.blockUIService.stop();
    //     ToastService.showError(Mensagem.FALHA_REQUISICAO);
    //   });
  }
}
