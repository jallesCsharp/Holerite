import { useState } from 'react';
import { User } from '../../../../../../provider/redux/@types/auth';
import AbstractController from '../../../../../../provider/services/abstractController';
import AuthService from '../../../../../../provider/services/authService';
import ToastService from '../../../../../../provider/services/toastService';
import { FormFileModel } from '../../../../../@types/model/FormFileModel';
import { GrupoModel } from '../../../../../@types/model/GrupoModel';
import ArquivoService from '../../../../../services/ArquivoService';
import PessoaService from '../../../../../services/PessoaService';

export default class AquivoController extends AbstractController {
  private authService = new AuthService();

  private arquivoService = new ArquivoService();

  private pessoaService = new PessoaService();

  public user?: User;

  private setUser?: any;

  public formFileModel?: FormFileModel[];

  private setFormFileModel: (e: any) => void;

  public listaPessoasModel: User[];

  private setListaPessoasModel: (e: any) => void;

  public selecionarPessoa?: User;

  private setSelecionarPessoa: (e: any) => void;

  public grupoModel?: GrupoModel;

  private setGrupoModel: (e: any) => void;

  public selected?: GrupoModel;

  public setSelected: (e: any) => void;

  public url?: String;

  public setUrl: (e: any) => void;

  constructor() {
    super();
    [this.url, this.setUrl] = useState<String>();
    [this.user, this.setUser] = useState<User>();
    [this.selecionarPessoa, this.setSelecionarPessoa] = useState<User>();
    [this.formFileModel, this.setFormFileModel] = useState<FormFileModel[]>([]);
    [this.listaPessoasModel, this.setListaPessoasModel] = useState<User[]>([]);
    [this.grupoModel, this.setGrupoModel] = useState<GrupoModel>();
    [this.selected, this.setSelected] = useState();
  }

  init() {
    super.init();
    let obterUser = this.obterUsuario();
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
  };

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

  public async Upload(file?: FormData) {
    try {
      this.blockUIService.start();
      await this.arquivoService.UploadArquivo(file);
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError('Erro ao tentar fazer upload do Cadastro!!');
      this.blockUIService.stop();
    }
  }

  public DowloadFile() {
    try {
      this.blockUIService.start();
      this.arquivoService.GetLayoutArquivo().then((result) => {
        let aTag = document.createElement('a');
        aTag.href = result;
        aTag.setAttribute('dowload', result);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
      });
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError('Erro ao tentar fazer dowload d Layout !!');
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
