import { useState } from 'react';
import { User } from '../../../../../../provider/redux/@types/auth';
import AbstractController from '../../../../../../provider/services/abstractController';
import AuthService from '../../../../../../provider/services/authService';
import ToastService from '../../../../../../provider/services/toastService';
import { CepModel } from '../../../../../@types/model/CepModel';
import { GrupoModel } from '../../../../../@types/model/GrupoModel';
import CepService from '../../../../../services/CepService';
import GrupoService from '../../../../../services/GrupoService';
import PessoaService from '../../../../../services/PessoaService';

export default class GrupoController extends AbstractController {
  private cepService = new CepService();

  private authService = new AuthService();

  private grupoService = new GrupoService();

  private pessoaService = new PessoaService();

  public user?: User;

  private setUser?: any;

  public cepModel?: CepModel;

  private setCepModel: (e: any) => void;

  public listaGrupoModel?: GrupoModel[];

  private setListaGrupoModel: (e: any) => void;

  public listaPessoasModel: User[];

  private setListaPessoasModel: (e: any) => void;

  public selecionarPessoa?: User;

  private setSelecionarPessoa: (e: any) => void;

  public grupoModel?: GrupoModel;

  private setGrupoModel: (e: any) => void;

  public selected?: GrupoModel;

  public setSelected: (e: any) => void;

  constructor() {
    super();
    [this.user, this.setUser] = useState<User>();
    [this.cepModel, this.setCepModel] = useState<CepModel>();
    [this.selecionarPessoa, this.setSelecionarPessoa] = useState<User>();
    [this.listaGrupoModel, this.setListaGrupoModel] = useState<GrupoModel[]>([]);
    [this.listaPessoasModel, this.setListaPessoasModel] = useState<User[]>([]);
    [this.grupoModel, this.setGrupoModel] = useState<GrupoModel>();
    [this.selected, this.setSelected] = useState();
  }

  init() {
    super.init();
    let obterUser = this.obterUsuario();
    this.ObterGrupos();
    this.ObterPessoas();
    console.log('obterUser');
    console.log(obterUser);
    this.setUser(obterUser);
    this.breadCrumbService.change([
      { label: 'Histórico de Alterações da Instalação', id: 'configuracoes-grupos' },
    ]);
  }

  onSelecionarChenge = (event?: User) => {
    this.setSelecionarPessoa(event);
    // console.log(event.id);
    // console.log('onSelecionarChenge lista');
    // console.log(this.listaPessoasModel);
    // for (let index = 0; index < this.listaPessoasModel.length; index++) {
    //   console.log('for');
    //   if (this.listaPessoasModel[index].Id == event.id) {
    //     console.log('if');
    //     this.setSelecionarPessoa(this.listaPessoasModel[index]);
    //     console.log('selecionar');
    //     console.log(this.selecionarPessoa);
    //   }
    // }
  };

  public async onInsertGrupo(grupo?: GrupoModel) {
    debugger;
    try {
      this.blockUIService.start();
      const teste = await this.grupoService.InsertGrupo(grupo);
      console.log('teste');
      console.log(teste);
      this.blockUIService.stop();
      return teste;
    } catch (error) {
      ToastService.showInfo(`Error: ${error}`);
    }
  }

  async onUpdateGrupo(grupo?: GrupoModel) {
    this.blockUIService.start();
    const teste = await this.grupoService.UpdateGrupos(grupo);
    this.blockUIService.stop();
    return teste;
  }

  async onDeleteGrupo(grupo?: GrupoModel) {
    debugger;
    this.blockUIService.start();
    const teste = await this.grupoService.DeleteGrupos(grupo);
    this.blockUIService.stop();
    return teste;
  }

  async obterUsuario() {
    this.blockUIService.start();
    let userStorage: User;
    userStorage = await this.authService.getUser();
    console.log(userStorage);
    if (userStorage) {
      this.setUser(userStorage);
      this.blockUIService.stop();
      return;
    } else {
      await this.setUser(userStorage);
      console.log('Usuario - user');
      console.log(this.user);
    }
    this.blockUIService.stop();
  }

  //   public limpar() {
  //     this.filter.setUf(null);
  //     this.filter.setMunicipio(null);
  //     this.filter.setPais(null);
  //     this.filter.setNomeEmpresa('');
  //     this.filter.setNomeInstalacao('');
  //     this.filter.setCampo(null);
  //     this.filter.setNomeUsuario('');
  //   }

  public async ObterCep(rowCep?: string) {
    this.blockUIService.start();
    const teste = await this.cepService
      .getCep(rowCep)
      .then(async (res) => {
        if (res.success === true) {
          ToastService.showSuccess('Cep localizado!!!');
          this.setCepModel(res.data);
          this.blockUIService.stop();
          return res.data;
        } else {
          ToastService.showError(res.errors);
          this.blockUIService.stop();
          return res.errors;
        }
      })
      .catch((err) => {
        this.blockUIService.stop();
        ToastService.showError(err.msg);
      });
    this.setCepModel(teste);
    return teste;
  }

  public async ObterGrupos() {
    try {
      this.blockUIService.start();
      const response = await this.grupoService.GetGrupos();
      const data: Array<any> = response.errors;

      const resultTrue = Object.values(response)[1];
      if (resultTrue) {
        this.setListaGrupoModel(response.data);
        console.log(response.data);
        ToastService.showInfo('Busca realizada !!');
      }
      this.blockUIService.stop();
      return data;
    } catch (error) {
      ToastService.showError('Erro ao tentar carregar tela !!');
      this.blockUIService.stop();
    }
  }

  public async ObterPessoas() {
    try {
      this.blockUIService.start();
      const response = await this.pessoaService.getPessoas();
      const data: Array<any> = response.errors;

      const resultTrue = Object.values(response)[1];
      if (resultTrue) {
        this.setListaPessoasModel(response.data);
        console.log(response.data);
        ToastService.showInfo('Busca realizada !!');
      }
      this.blockUIService.stop();
      return data;
    } catch (error) {
      ToastService.showError('Erro ao tentar carregar tela !!');
      this.blockUIService.stop();
    }
  }
}
