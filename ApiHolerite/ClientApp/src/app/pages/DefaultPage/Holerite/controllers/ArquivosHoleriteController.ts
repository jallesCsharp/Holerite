import { useHistory } from 'react-router-dom';
import AbstractController from '../../../../../provider/services/abstractController';
// import ToastService from '../../../../../provider/services/toastService';
import ArquivoService from '../../../../services/ArquivoService';
// import { Mensagem } from '../../../../shared/mensagem/Mensagem';
import ArquivosFilter from '../models/ArquivosFilter';
import { MesExt } from '../../../../@types/enums/Mes';
import PessoaService from '../../../../services/PessoaService';
import ToastService from '../../../../../provider/services/toastService';
import { Mensagem } from '../../../../shared/mensagem/Mensagem';
import { useState } from 'react';
import { FilterArquivosHolerite } from '../../../../@types/filters/FilterArquivosHolerite';
import { PessoasModel } from '../../../../@types/model/PessoasModel';

export default class ArquivosHoleriteController extends AbstractController {
  public filter: ArquivosFilter;

  history = useHistory();

  private arquivoService = new ArquivoService();

  private pessoaService = new PessoaService();

  public listaPessoaFilter: any;

  private setListaPessoaFilter: (e: any) => void;

  public listaPessoas: any[];

  private setListaPessoas: (e: any) => void;

  constructor(filter: ArquivosFilter) {
    super();
    this.filter = filter;
    this.history = useHistory();
    [this.listaPessoaFilter, this.setListaPessoaFilter] = useState();
    [this.listaPessoas, this.setListaPessoas] = useState<PessoasModel[]>([]);
  }

  async init() {
    super.init();
    await this.PesquisarArquivos({ Mes: 0, Id: null, Nome: null, PessoaId: null });
    this.breadCrumbService.change([
      {
        label: 'Listar Holerite',
        id: 'listar-holerite',
      },
    ]);
  }

  public async CarregarTela() {
    this.filter.setListaMes(MesExt.GetMes());
    this.SelecionarMes(MesExt.GetMesString('0'));
    this.GetAllListaPessoas();
  }

  public visulizarHol = async (arquivo?: any) => {
    this.blockUIService.start();
    this.filter.setOnVisualizar(true);
    const result = await this.arquivoService.getArquivoHolerite(arquivo.id);
    if (result.success === false) {
      ToastService.showError(result.errors);
      return;
    }
    console.log('result');
    console.log(result);
    this.filter.setArquivosModel(result.data);
    this.blockUIService.stop();
  };

  public modalOnFechar = () => {
    this.filter.setOnVisualizar(false);
    this.filter.setArquivosModel(null);
  };

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

  public SelecionarMes(idMes: any) {
    this.filter.setMes(idMes);
  }

  public SelecionarAno(ano: number) {
    this.filter.setAno(ano);
  }

  public async GetAllListaPessoas() {
    try {
      this.blockUIService.start();
      await this.pessoaService.getPessoas().then((result) => {
        if (result.success == false) {
          ToastService.showError(result.errors);
          return;
        }
        this.setListaPessoas(result.data);
        return result.data;
      });
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501);
      this.blockUIService.stop();
    }
  }

  public async PesquisarArquivos(filter: FilterArquivosHolerite) {
    try {
      this.blockUIService.start();
      await this.arquivoService.getPesquisarArquivos(filter).then((result) => {
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

  searchPessoa() {
    const search = (event: { query: string }) => {
      setTimeout(() => {
        let results;
        if (!event.query.trim().length) {
          results = [...this.listaPessoas];
        } else {
          results = this.listaPessoas?.filter((item) => {
            if (item.nome != undefined) {
              return item?.nome.toLowerCase().startsWith(event.query.toLowerCase());
            }
          });
        }
        this.setListaPessoaFilter(results);
      }, 250);
    };
    return search;
  }

  //   public async limparFilter() {}

  public voltaNav() {
    //this.history.goBack();
  }

  public limpar() {
    //this.history.goBack();
  }
}
