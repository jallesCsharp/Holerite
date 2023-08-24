import { useHistory } from 'react-router-dom';
import AbstractController from '../../../../../provider/services/abstractController';
// import ToastService from '../../../../../provider/services/toastService';
import ToastService from '../../../../../provider/services/toastService';
import { Mensagem } from '../../../../shared/mensagem/Mensagem';
import PessoaService from '../../../../services/PessoaService';
import { PessoasModel } from '../../../../@types/model/PessoasModel';
import EmpresasService from '../../../../services/EmpresasService';
import { EmpresaModel } from '../../../../@types/model/EmpresaModel';
import PerfilFilter from '../models/PerfilFilter';
import { ProfissoesModel } from '../../../../@types/model/ProfissoesModel';
import ProfissoesService from '../../../../services/ProfissoesService';
import { useState } from 'react';

export default class PerfilController extends AbstractController {
  public filter: PerfilFilter;

  history = useHistory();

  private pessoaService = new PessoaService();

  private empresasService = new EmpresasService();

  private profissoesService = new ProfissoesService();

  private teste?: PessoasModel;

  private setTeste: (e: any) => void;

  constructor(filter: PerfilFilter) {
    super();
    this.filter = filter;
    this.history = useHistory();
    [this.teste, this.setTeste] = useState<PessoasModel>();
  }

  async init() {
    super.init();
    await this.getPesquisarEmpresas();
    await this.getPesquisarProfissoes();
    this.breadCrumbService.change([
      {
        label: 'Perfil Usuário',
        id: 'perfil_usuarios',
      },
    ]);
  }

  public onEditarPerfil = () => {
    this.filter.setEditarPerfil(false);
  };

  public onSalvarFicha = async () => {
    this.filter.setLoading(true);
    try {
      this.blockUIService.start();
      if (this.filter.pessoa?.id === undefined) {
        await this.pessoaService.Create(this.filter.pessoa).then((result) => {
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
          this.filter.setPessoa(result.data);
          return result.data;
        });
      } else {
        await this.pessoaService.Update(this.filter.pessoa).then((result) => {
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
          this.filter.setPessoa(result.data);
          return result.data;
        });
      }
      this.blockUIService.stop();
      this.fecharModal();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501 + error);
      this.blockUIService.stop();
      this.fecharModal();
    }
  };

  public fecharModal = () => {
    this.filter.setSubmitted(false);
    this.filter.setModalDialog(false);
    this.filter.setLoading(false);
  };

  public fecharLoading = () => {
    this.filter.setLoading(false);
  };

  public editarTemplate = (pessoa?: PessoasModel) => {
    const itemEmpresa = { ...pessoa?.empresas };
    this.filter.setPessoa(pessoa);
    this.filter.setEmpresaSelecionado(itemEmpresa);
    this.filter.setModalDialog(true);
  };

  public confirmDeleteTemplate = (pessoa: PessoasModel) => {
    this.filter.setPessoa(pessoa);
    this.filter.setDeleteTemplateDialog(true);
  };

  // Empresa

  public CadastrarEmpresa = () => {
    this.filter.setModalEmpresaDialog(true);
  };

  public onDialogCancelarEmpresa = () => {
    this.filter.setSubmitted(false);
    this.filter.setModalEmpresaDialog(false);
  };

  public fecharModalEmpresa = async () => {
    await this.getPesquisarEmpresas();
    this.filter.setSubmitted(false);
    this.filter.setModalEmpresaDialog(false);
    this.filter.setLoading(false);
  };

  public onSalvarEmpresa = async () => {
    console.log('onSalvarEmpresa');
    this.filter.setLoading(true);
    try {
      this.blockUIService.start();
      await this.empresasService.Create(this.filter.empresaSelecionado).then((result) => {
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
        this.filter.setEmpresa(result.data);
        return result.data;
      });
      this.blockUIService.stop();
      this.fecharModalEmpresa();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501 + error);
      this.blockUIService.stop();
      this.fecharModalEmpresa();
    }
  };

  public onSelecionarEmpresa = (empresa: EmpresaModel) => {
    console.log('onSelecionarEmpresa');
    console.log(empresa);
    if (this.filter.listaEmpresas) {
      for (let i = 0; i < this.filter.listaEmpresas.length; i++) {
        if (this.filter.listaEmpresas[i].nomeEmpresa === empresa) {
          this.filter.setPessoa({
            ...this.filter.pessoa,
            empresasId: this.filter.listaEmpresas[i].id,
            empresas: this.filter.listaEmpresas[i],
          });
          let itemEmpresa = { ...this.filter.listaEmpresas[i] };
          this.filter.setEmpresaSelecionado(itemEmpresa);
        }
      }
    }
  };

  // Empresa

  //Profissao

  public CadastrarProfissao = () => {
    this.filter.setModalProfissaoDialog(true);
  };

  public onDialogCancelarProfissao = () => {
    this.filter.setSubmitted(false);
    this.filter.setModalProfissaoDialog(false);
  };

  public fecharModalProfissao = async () => {
    await this.getPesquisarProfissoes();
    this.filter.setSubmitted(false);
    this.filter.setModalEmpresaDialog(false);
    this.filter.setLoading(false);
  };

  public onSalvarProfissao = async () => {
    console.log('onSalvarProfissao');
    this.filter.setLoading(true);
    try {
      this.blockUIService.start();
      await this.profissoesService.Create(this.filter.profissoesSelecionado).then((result) => {
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
        this.filter.setEmpresa(result.data);
        return result.data;
      });
      this.blockUIService.stop();
      this.fecharModalEmpresa();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501 + error);
      this.blockUIService.stop();
      this.fecharModalEmpresa();
    }
  };

  public onSelecionarProfissao = (profissao: ProfissoesModel) => {
    if (this.filter.listaProfissoes) {
      for (let i = 0; i < this.filter.listaProfissoes.length; i++) {
        if (this.filter.listaProfissoes[i].nomeProfissao === profissao) {
          this.filter.setPessoa({
            ...this.filter.pessoa,
            profissoesId: this.filter.listaProfissoes[i].id,
            profissoes: this.filter.listaProfissoes[i],
          });
          let item = { ...this.filter.listaProfissoes[i] };
          this.filter.setProfissoesSelecionado(item);
        }
      }
    }
  };

  //Profissao

  // GET

  public async getPesquisarPerfilUsuario(id?: any) {
    this.blockUIService.start();
    try {
      let pessoa = await this.pessoaService
        .getPerfil(id)
        .then((result) => {
          if (result.success === false) {
            ToastService.showError(
              'Error: ' + result.errors.status + ' - ' + result.errors.data.errors.Messagens[0],
            );
            return;
          }
          return result.data;
        })
        .catch((error) => {
          console.log('catch - getPesquisarPerfilUsuario');
          console.log(error);
        });
      this.filter.setPessoa(pessoa);
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501 + error);
      this.blockUIService.stop();
    }
  }

  public async getPesquisarEmpresas() {
    try {
      this.blockUIService.start();
      await this.empresasService.getEmpresas().then((result) => {
        console.log('getPesquisarEmpresas');
        console.log(result.data);

        if (result.data?.toString() === '400') {
          ToastService.showError(Mensagem.ERROR_400);
          return;
        }
        this.filter.setListaEmpresas(result.data);
        return result.data;
      });
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501 + error);
      this.blockUIService.stop();
    }
  }

  public async getPesquisarProfissoes() {
    try {
      this.blockUIService.start();
      await this.profissoesService.getProfissoes().then((result) => {
        console.log(result.data);

        if (result.data?.toString() === '400') {
          ToastService.showError(Mensagem.ERROR_400);
          return;
        }
        this.filter.setListaProfissoes(result.data);
        return result.data;
      });
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501 + error);
      this.blockUIService.stop();
    }
  }
}