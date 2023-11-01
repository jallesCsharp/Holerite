import AbstractController from '../../../../../../provider/services/abstractController';
import ToastService from '../../../../../../provider/services/toastService';
import { PerfilModel } from '../../../../../@types/model/PerfilModel';
import PerfilService from '../../../../../services/PerfilService';
import { Mensagem } from '../../../../../shared/mensagem/Mensagem';
import PerfilGruposFilter from '../../models/Perfil/PerfilGruposFilter';

export default class PerfilGruposController extends AbstractController {
  public filter: PerfilGruposFilter;

  private perfilService = new PerfilService();

  constructor(filter: PerfilGruposFilter) {
    super();
    this.filter = filter;
  }

  async init() {
    super.init();
    await this.obterPerfilGrupos();
    this.breadCrumbService.change([{ label: 'Controle de Acessos', id: 'configuracoes-perfil' }]);
  }

  public openNew = () => {
    this.filter.setPerfilGruposModalDialog(true);
    this.filter.setPerfilGrupoSelecionado({
      ...this.filter.perfilGrupoSelecionado,
      id: undefined,
    });
  };

  public onDialogCancelarPerfilGrupos = () => {
    this.filter.setSubmitted(false);
    this.filter.setPerfilGruposModalDialog(false);
  };

  public onSelecionarPerfilGrupo = (perfil: string) => {
    console.log('lista grupo');
    console.log(this.filter.listaPerfilGrupos);
    if (this.filter.listaPerfilGrupos) {
      for (let i = 0; i < this.filter.listaPerfilGrupos.length; i++) {
        if (this.filter.listaPerfilGrupos[i].nomePerfil === perfil) {
          this.filter.setPerfilGrupoSelecionado(this.filter.listaPerfilGrupos[i]);
        }
      }
    }
  };

  public async onInsertPerfil(perfil?: PerfilModel) {
    try {
      this.blockUIService.start();
      const perfilResult = await this.perfilService.InsertPerfil(perfil);
      this.blockUIService.stop();
      return perfilResult;
    } catch (error) {
      ToastService.showInfo(`Error: ${error}`);
    }
  }

  public CadastrarPerfilGrupos = () => {
    this.filter.setCadastrarPerfilModalDialog(true);
  };

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

  public onDialogCancelar = () => {
    this.filter.setSubmitted(false);
    this.filter.setPerfilGruposModalDialog(false);
  };

  async obterPerfilGrupos() {
    this.blockUIService.start();
    const result = await this.perfilService.GetAll();
    this.filter.setListaPerfilGrupos(result.data);
    this.filter.setListaControleAcessos(result.data);
    ToastService.showSuccess(`Busca Realizada com Sucesso!`);
    this.blockUIService.stop();
  }

  public fecharModal = () => {
    this.filter.setSubmitted(false);
    this.filter.setPerfilGruposModalDialog(false);
    this.filter.setLoading(false);
    this.obterPerfilGrupos();
  };

  public onSalvarPerfilGrupos = async () => {
    this.filter.setLoading(true);
    try {
      this.blockUIService.start();
      if (this.filter.perfilGrupoSelecionado?.id === undefined) {
        await this.perfilService.InsertPerfil(this.filter.perfilGrupoSelecionado).then((result) => {
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
          this.filter.setListaPerfilGrupos(result.data);
          return result.data;
        });
      } else {
        await this.perfilService.UpdatePerfil(this.filter.perfilGrupoSelecionado).then((result) => {
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
          this.filter.setListaPerfilGrupos(result.data);
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
}
