import { useState } from 'react';
import { PessoasModel } from '../../../../@types/model/PessoasModel';
import { EmpresaModel } from '../../../../@types/model/EmpresaModel';
import { ProfissoesModel } from '../../../../@types/model/ProfissoesModel';

export default class PerfilFilter {
  public modalEmpresaDialog?: boolean;

  public setModalEmpresaDialog: (e: any) => void;

  public modalProfissaoDialog?: boolean;

  public setModalProfissaoDialog: (e: any) => void;

  public editarPerfil?: boolean;

  public setEditarPerfil: (e: any) => void;

  public modalDialog?: boolean;

  public setModalDialog: (e: any) => void;

  public loading?: boolean;

  public setLoading: (e: any) => void;

  public deleteTemplateDialog?: boolean;

  public setDeleteTemplateDialog: (e: any) => void;

  public submitted?: boolean;

  public setSubmitted: (e: any) => void;

  public empresaSelecionado?: EmpresaModel | undefined;

  public setEmpresaSelecionado: (e: any) => void;

  public empresa?: EmpresaModel | undefined;

  public setEmpresa: (e: any) => void;

  public profissoesSelecionado?: ProfissoesModel | undefined;

  public setProfissoesSelecionado: (e: any) => void;

  public profissoes?: ProfissoesModel | undefined;

  public setProfissoes: (e: any) => void;

  public pessoa?: PessoasModel | undefined;

  public setPessoa: (e: any) => void;

  public listaEmpresas?: EmpresaModel[] | undefined;

  public setListaEmpresas: (e: any) => void;

  public listaProfissoes?: ProfissoesModel[] | undefined;

  public setListaProfissoes: (e: any) => void;

  constructor() {
    [this.submitted, this.setSubmitted] = useState<boolean>(false);
    [this.loading, this.setLoading] = useState<boolean>(false);
    [this.modalDialog, this.setModalDialog] = useState<boolean>(false);
    [this.editarPerfil, this.setEditarPerfil] = useState<boolean>(true);
    [this.modalEmpresaDialog, this.setModalEmpresaDialog] = useState<boolean>(false);
    [this.modalProfissaoDialog, this.setModalProfissaoDialog] = useState<boolean>(false);
    [this.deleteTemplateDialog, this.setDeleteTemplateDialog] = useState<boolean>(false);
    [this.empresaSelecionado, this.setEmpresaSelecionado] = useState<EmpresaModel | undefined>();
    [this.empresa, this.setEmpresa] = useState<EmpresaModel | undefined>();
    [this.profissoesSelecionado, this.setProfissoesSelecionado] = useState<ProfissoesModel>();
    [this.profissoes, this.setProfissoes] = useState<ProfissoesModel>();
    [this.pessoa, this.setPessoa] = useState<PessoasModel | undefined>(undefined);
    [this.listaEmpresas, this.setListaEmpresas] = useState<EmpresaModel[]>();
    [this.listaProfissoes, this.setListaProfissoes] = useState<ProfissoesModel[]>();
  }
}
