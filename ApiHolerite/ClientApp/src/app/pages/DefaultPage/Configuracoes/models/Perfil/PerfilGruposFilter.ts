import { useState } from 'react';
import { ControleAcessosModel } from '../../../../../@types/model/ControleAcessosModel';
import { PerfilModel } from '../../../../../@types/model/PerfilModel';

export default class PerfilGruposFilter {
  public cadastrarPerfilModalDialog?: boolean;

  public setCadastrarPerfilModalDialog: (e: any) => void;

  public perfilGruposModalDialog?: boolean;

  public setPerfilGruposModalDialog: (e: any) => void;

  public loading?: boolean;

  public setLoading: (e: any) => void;

  public deleteModalDialog?: boolean;

  public setDeleteModalDialog: (e: any) => void;

  public submitted?: boolean;

  public setSubmitted: (e: any) => void;

  public perfilGrupoSelecionado?: PerfilModel;

  public setPerfilGrupoSelecionado: (e: any) => void;

  public controleAcessosSelecionado?: ControleAcessosModel | undefined;

  public setControleAcessosSelecionado: (e: any) => void;

  public listaPerfilGrupos?: PerfilModel[];

  public setListaPerfilGrupos: (e: any) => void;

  public listaControleAcessos?: ControleAcessosModel[] | undefined;

  public setListaControleAcessos: (e: any) => void;

  constructor() {
    [this.submitted, this.setSubmitted] = useState<boolean>(false);
    [this.loading, this.setLoading] = useState<boolean>(false);
    [this.cadastrarPerfilModalDialog, this.setCadastrarPerfilModalDialog] =
      useState<boolean>(false);
    [this.perfilGruposModalDialog, this.setPerfilGruposModalDialog] = useState<boolean>(false);
    [this.deleteModalDialog, this.setDeleteModalDialog] = useState<boolean>(false);
    [this.perfilGrupoSelecionado, this.setPerfilGrupoSelecionado] = useState<
      PerfilModel | undefined
    >();
    [this.controleAcessosSelecionado, this.setControleAcessosSelecionado] = useState<
      ControleAcessosModel | undefined
    >();
    [this.listaPerfilGrupos, this.setListaPerfilGrupos] = useState<PerfilModel[] | undefined>();
    [this.listaControleAcessos, this.setListaControleAcessos] = useState<ControleAcessosModel[]>();
  }
}
