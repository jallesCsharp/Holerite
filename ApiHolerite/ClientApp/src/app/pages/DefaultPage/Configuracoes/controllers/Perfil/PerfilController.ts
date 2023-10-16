import { useState } from 'react';
import { User } from '../../../../../../provider/redux/@types/auth';
import AbstractController from '../../../../../../provider/services/abstractController';
import AuthService from '../../../../../../provider/services/authService';
import ToastService from '../../../../../../provider/services/toastService';
import { CepModel } from '../../../../../@types/model/CepModel';
import CepService from '../../../../../services/CepService';
import PessoaService from '../../../../../services/PessoaService';
import { PerfilModel } from '../../../../../@types/model/PerfilModel';
import PerfilService from '../../../../../services/PerfilService';

export default class PerfilController extends AbstractController {
  private cepService = new CepService();

  private authService = new AuthService();

  private perfilService = new PerfilService();

  private pessoaService = new PessoaService();

  public user?: User;

  private setUser?: any;

  public cepModel?: CepModel;

  private setCepModel: (e: any) => void;

  public listaPerfilModel?: PerfilModel[];

  private setListaPerfilModel: (e: any) => void;

  public listaPessoasModel: User[];

  private setListaPessoasModel: (e: any) => void;

  public selecionarPessoa?: User;

  private setSelecionarPessoa: (e: any) => void;

  public perfilModel?: PerfilModel;

  private setPerfilModel: (e: any) => void;

  public selected?: PerfilModel;

  public setSelected: (e: any) => void;

  constructor() {
    super();
    [this.user, this.setUser] = useState<User>();
    [this.cepModel, this.setCepModel] = useState<CepModel>();
    [this.selecionarPessoa, this.setSelecionarPessoa] = useState<User>();
    [this.listaPerfilModel, this.setListaPerfilModel] = useState<PerfilModel[]>([]);
    [this.listaPessoasModel, this.setListaPessoasModel] = useState<User[]>([]);
    [this.perfilModel, this.setPerfilModel] = useState<PerfilModel>();
    [this.selected, this.setSelected] = useState();
  }

  init() {
    super.init();
    let obterUser = this.obterUsuario();
    this.ObterPerfil();
    this.ObterPessoas();
    this.setUser(obterUser);
    this.breadCrumbService.change([
      { label: 'Histórico de Alterações da Instalação', id: 'configuracoes-perfil' },
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

  public async onInsertPerfil(perfil?: PerfilModel) {
    debugger;
    try {
      this.blockUIService.start();
      const perfilResult = await this.perfilService.InsertPerfil(perfil);
      this.blockUIService.stop();
      return perfilResult;
    } catch (error) {
      ToastService.showInfo(`Error: ${error}`);
    }
  }

  async onUpdatePerfil(perfil?: PerfilModel) {
    this.blockUIService.start();
    const teste = await this.perfilService.UpdatePerfil(perfil);
    this.blockUIService.stop();
    return teste;
  }

  async onDeletePerfil(perfil?: PerfilModel) {
    this.blockUIService.start();
    const teste = await this.perfilService.DeletePerfil(perfil);
    this.blockUIService.stop();
    return teste;
  }

  async obterUsuario() {
    this.blockUIService.start();
    let userStorage: User;
    userStorage = await this.authService.getUser();
    if (userStorage) {
      this.setUser(userStorage);
      this.blockUIService.stop();
      return;
    } else {
      await this.setUser(userStorage);
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

  public async ObterPerfil() {
    try {
      this.blockUIService.start();
      const response = await this.perfilService.GetPerfil();
      const data: Array<any> = response.errors;

      const resultTrue = Object.values(response)[1];
      if (resultTrue) {
        this.setListaPerfilModel(response.data);
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
