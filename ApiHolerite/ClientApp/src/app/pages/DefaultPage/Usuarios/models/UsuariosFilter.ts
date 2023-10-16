import { useState } from 'react';
import { PessoasModel } from '../../../../@types/model/PessoasModel';
import { EmpresaModel } from '../../../../@types/model/EmpresaModel';

export default class UsuariosFilter {
  public editarModalDialog?: boolean;

  public setEditarModalDialog: (e: any) => void;

  public loading?: boolean;

  public setLoading: (e: any) => void;

  public deleteModalDialog?: boolean;

  public setDeleteModalDialog: (e: any) => void;

  public submitted?: boolean;

  public setSubmitted: (e: any) => void;

  public pessoasSelecionado?: PessoasModel;

  public setPessoasSelecionado: (e: any) => void;

  public empresaSelecionado?: EmpresaModel | undefined;

  public setEmpresaSelecionado: (e: any) => void;

  public listaPessoas?: PessoasModel[];

  public setListaPessoas: (e: any) => void;

  public listaEmpresas?: EmpresaModel[] | undefined;

  public setListaEmpresas: (e: any) => void;

  constructor() {
    [this.submitted, this.setSubmitted] = useState<boolean>(false);
    [this.loading, this.setLoading] = useState<boolean>(false);
    [this.editarModalDialog, this.setEditarModalDialog] = useState<boolean>(false);
    [this.deleteModalDialog, this.setDeleteModalDialog] = useState<boolean>(false);
    [this.pessoasSelecionado, this.setPessoasSelecionado] = useState<PessoasModel | undefined>();
    [this.empresaSelecionado, this.setEmpresaSelecionado] = useState<EmpresaModel | undefined>();
    [this.listaPessoas, this.setListaPessoas] = useState<PessoasModel[] | undefined>();
    [this.listaEmpresas, this.setListaEmpresas] = useState<EmpresaModel[]>();
  }
}
