import { useState } from 'react';
import AbstractController from '../../../../../../provider/services/abstractController';
import ToastService from '../../../../../../provider/services/toastService';
import { FilterFuncionalidades } from '../../../../../@types/filters/FilterFuncionalidades';
import { PerfilModel } from '../../../../../@types/model/PerfilModel';
import ControleAcessoService from '../../../../../services/ControleAcessoService';
import FuncionalidadesService from '../../../../../services/FuncionalidadesService';
import PerfilService from '../../../../../services/PerfilService';
import { Mensagem } from '../../../../../shared/mensagem/Mensagem';
import PerfilGruposFilter from '../../models/Perfil/PerfilGruposFilter';
import { ControleAcessosModel } from '../../../../../@types/model/ControleAcessosModel';

export default class PerfilGruposController extends AbstractController {
  public filter: PerfilGruposFilter;

  private perfilService = new PerfilService();

  private controleAcessoService = new ControleAcessoService();

  private funcionalidadesService = new FuncionalidadesService();

  public cadastrarFuncionalidades?: any[];

  private setCadastrarFuncionalidades: (e: any) => void;

  constructor(filter: PerfilGruposFilter) {
    super();
    this.filter = filter;
    [this.cadastrarFuncionalidades, this.setCadastrarFuncionalidades] = useState([]);
  }

  async init() {
    super.init();
    await this.obterControleAcesso();
    this.breadCrumbService.change([{ label: 'Controle de Acessos', id: 'configuracoes-perfil' }]);
  }

  public openNew = async () => {
    await this.obterPerfilGrupos();
    this.filter.setPerfilGruposModalDialog(true);
    this.filter.setPerfilGrupoSelecionado({
      ...this.filter.perfilGrupoSelecionado,
      id: undefined,
    });
  };

  public removerFuncionalidadeTemplate = (item: ControleAcessosModel) => {
    this.filter.setControleAcessosSelecionado(item);
    this.filter.setRemoverModalDialog(true);
  };

  public onDialogCancelarPerfilGrupos = () => {
    this.init();
    this.filter.setSubmitted(false);
    this.filter.setPerfilGruposModalDialog(false);
  };

  public CadastrarPerfilGrupos = () => {
    this.filter.setCadastrarPerfilModalDialog(true);
    this.filter.setPerfilGrupoSelecionado(null);
  };

  public removerSelecionado = async () => {
    this.blockUIService.start();
    this.filter.setRemoverModalDialog(false);
    console.log('iniciar remocao');
    let result = await this.controleAcessoService.RemoverControler(
      this.filter.controleAcessosSelecionado,
    );
    ToastService.showWarn(result.success === true ? 'Remover com Sucesso!!!' : 'Tente novamente!');
    this.fecharModalConfirmacao();
    this.blockUIService.stop();
  };

  public fecharCadastrarPerfilModal = async () => {
    await this.init();
    this.filter.setCadastrarPerfilModalDialog(false);
  };

  public onDialogCancelar = () => {
    this.init();
    this.filter.setSubmitted(false);
    this.filter.setPerfilGruposModalDialog(false);
  };

  public fecharModalConfirmacao = () => {
    this.filter.setRemoverModalDialog(true);
    this.filter.setControleAcessosSelecionado(null);
  };

  public fecharModal = async () => {
    this.filter.setSubmitted(false);
    this.filter.setPerfilGruposModalDialog(false);
    this.filter.setLoading(false);
    this.setCadastrarFuncionalidades([]);
    this.filter.setAddFuncionalidades([]);
    await this.obterControleAcesso();
  };

  public adicionarListadeCadastro = async () => {
    if (this.filter.funcionalidadesSelecionado) {
      this.cadastrarFuncionalidades?.push(this.filter.funcionalidadesSelecionado);

      this.filter.setAddFuncionalidades(this.cadastrarFuncionalidades);
      const removerItem = this.filter.listaFuncionalidades?.filter(
        (x) => x.id !== this.filter.funcionalidadesSelecionado?.id,
      );
      this.filter.setListaFuncionalidades(removerItem);
    }
    this.filter.setFuncionalidadesSelecionado(undefined);
  };

  public onSelecionarPerfilGrupo = (perfil: string) => {
    this.setCadastrarFuncionalidades([]);
    this.filter.setAddFuncionalidades([]);
    if (this.filter.listaPerfilGrupos) {
      for (let i = 0; i < this.filter.listaPerfilGrupos.length; i++) {
        if (this.filter.listaPerfilGrupos[i].nomePerfil === perfil) {
          this.filter.setPerfilGrupoSelecionado(this.filter.listaPerfilGrupos[i]);
          this.obterFuncionalidades(this.filter.listaPerfilGrupos[i]?.nomePerfil);
        }
      }
    }
  };

  public onSelecionarFuncionalidades = (funcionalidade: string) => {
    if (this.filter.listaFuncionalidades) {
      for (let i = 0; i < this.filter.listaFuncionalidades.length; i++) {
        if (this.filter.listaFuncionalidades[i].modulo === funcionalidade) {
          this.filter.setFuncionalidadesSelecionado(this.filter.listaFuncionalidades[i]);
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

  async obterControleAcesso() {
    this.filter.setListaControleAcessos([]);
    this.blockUIService.start();
    const result = await this.controleAcessoService.GetAll();
    this.filter.setListaControleAcessos(result.data);
    ToastService.showSuccess(`Busca Realizada com Sucesso!`);
    this.blockUIService.stop();
  }

  async obterPerfilGrupos() {
    this.blockUIService.start();
    const result = await this.perfilService.GetAll();
    this.filter.setListaPerfilGrupos(result.data);
    ToastService.showSuccess(`Cadastrar Funcionalidades!`);
    this.blockUIService.stop();
  }

  async obterFuncionalidades(nomePerfil?: string) {
    this.blockUIService.start();
    let filter: FilterFuncionalidades = {
      Id: null,
      Menu: null,
      Modulo: null,
      NomePerfil: nomePerfil === undefined ? null : nomePerfil,
      Ativo: null,
    };

    const result = await this.funcionalidadesService.GetFuncionalidades(filter);
    this.filter.setListaFuncionalidades(result.data);
    if (result.data?.length) {
      ToastService.showInfo(`Total de Funcionalidades disponivel ${result.data?.length}!`);
    } else {
      ToastService.showWarn(`Grupo "${nomePerfil}" não tem funcionalidades disponivel!`);
    }
    this.blockUIService.stop();
  }

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

  public onSalvarPerfilControler = async () => {
    console.log('onSalvarPerfilControler');
    this.filter.setLoading(true);
    try {
      this.blockUIService.start();
      if (this.filter.addFuncionalidades && this.filter.perfilGrupoSelecionado) {
        await this.controleAcessoService
          .InsertPerfilControler(this.filter.addFuncionalidades, this.filter.perfilGrupoSelecionado)
          .then((result) => {
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
            this.filter.setListaControleAcessos(result.data);
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
