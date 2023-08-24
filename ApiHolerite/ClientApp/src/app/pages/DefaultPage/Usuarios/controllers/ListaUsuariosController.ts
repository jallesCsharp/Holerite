import { useHistory } from 'react-router-dom';
import AbstractController from '../../../../../provider/services/abstractController';
// import ToastService from '../../../../../provider/services/toastService';
import UsuariosFilter from '../models/UsuariosFilter';
import ToastService from '../../../../../provider/services/toastService';
import { Mensagem } from '../../../../shared/mensagem/Mensagem';
import PessoaService from '../../../../services/PessoaService';
import { PessoasModel } from '../../../../@types/model/PessoasModel';
import EmpresasService from '../../../../services/EmpresasService';
import { EmpresaModel } from '../../../../@types/model/EmpresaModel';

export default class ListaUsuariosController extends AbstractController {
  public filter: UsuariosFilter;

  history = useHistory();

  private pessoaService = new PessoaService();

  private empresasService = new EmpresasService();

  constructor(filter: UsuariosFilter) {
    super();
    this.filter = filter;
    this.history = useHistory();
  }

  async init() {
    super.init();
    await this.getPesquisarUsuario();
    await this.getPesquisarEmpresas();
    this.breadCrumbService.change([
      {
        label: 'Listar Usuários',
        id: 'listar-usuarios',
      },
    ]);
  }

  public onDialogCancelarFicha = () => {
    this.filter.setSubmitted(false);
    this.filter.setModalDialog(false);
  };

  public onSalvarFicha = async () => {
    this.filter.setLoading(true);
    try {
      this.blockUIService.start();
      if (this.filter.pessoasSelecionado?.id === undefined) {
        await this.pessoaService.Create(this.filter.pessoasSelecionado).then((result) => {
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
          this.filter.setListaPessoas(result.data);
          return result.data;
        });
      } else {
        await this.pessoaService.Update(this.filter.pessoasSelecionado).then((result) => {
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
          this.filter.setListaPessoas(result.data);
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
    this.getPesquisarUsuario();
  };

  public editarTemplate = (pessoa?: PessoasModel) => {
    const itemEmpresa = { ...pessoa?.empresas };
    this.filter.setPessoasSelecionado(pessoa);
    this.filter.setEmpresaSelecionado(itemEmpresa);
    this.filter.setModalDialog(true);
  };

  public confirmDeleteTemplate = (pessoa: PessoasModel) => {
    this.filter.setPessoasSelecionado(pessoa);
    this.filter.setDeleteTemplateDialog(true);
  };

  public onSelecionarEmpresa = (empresa: EmpresaModel) => {
    if (this.filter.listaEmpresas) {
      for (let i = 0; i < this.filter.listaEmpresas.length; i++) {
        if (this.filter.listaEmpresas[i].nomeEmpresa === empresa) {
          this.filter.setPessoasSelecionado({
            ...this.filter.pessoasSelecionado,
            empresasId: this.filter.listaEmpresas[i].id,
            empresas: this.filter.listaEmpresas[i],
          });
          let itemEmpresa = { ...this.filter.listaEmpresas[i] };
          this.filter.setEmpresaSelecionado(itemEmpresa);
        }
      }
    }
  };

  public async getPesquisarUsuario() {
    try {
      this.blockUIService.start();
      await this.pessoaService.getPessoas().then((result) => {
        console.log(result.data);

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
        this.filter.setListaPessoas(result.data);
        return result.data;
      });
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
}
