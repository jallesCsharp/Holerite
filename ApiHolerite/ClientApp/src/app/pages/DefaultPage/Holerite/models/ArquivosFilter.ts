import { useState } from 'react';
import { ArquivosModel } from '../../../../@types/model/ArquivosModel';
import { EmpresaModel } from '../../../../@types/model/EmpresaModel';
import { PessoasModel } from '../../../../@types/model/PessoasModel';

export default class ArquivosFilter {
  public onVisualizar?: boolean;

  public setOnVisualizar: any;

  public arquivosModel?: ArquivosModel;

  public setArquivosModel: any;

  public listaArquivos?: ArquivosModel[];

  public setListaArquivos: (e: any) => void;

  public empresaModel?: EmpresaModel;

  public setEmpresaModel: any;

  public pessoasModel?: PessoasModel;

  public listaPessoasAuto?: PessoasModel[];

  public setListaPessoasAuto: any;

  public setPessoasModel: any;

  public dataInicio?: Date;

  public setDataInicio: any;

  public dataFim?: Date;

  public setDataFim: any;

  public pessoasId?: any;

  public setPessoasId: any;

  public arquivoDocumentoId?: any;

  public setArquivoDocumentoId: any;

  public mes?: any;

  public setMes: any;

  public ano?: number;

  public setAno: (e: any) => void;

  public listaMes?: any[];

  public setListaMes: any;

  public listaEmpresaAuto?: any;

  public setListaEmpresaAuto: any;

  public pessoaNome?: string;

  public setPessoaNome: any;

  public arquivo?: any;

  public setArquivo: any;

  public emailEnviado?: boolean;

  public setEmailEnviado: any;

  public pessoasFiltradas: any;

  public setPessoasFiltradas: (e: any) => void;

  constructor() {
    [this.onVisualizar, this.setOnVisualizar] = useState<boolean>(false);
    [this.arquivosModel, this.setArquivosModel] = useState<ArquivosModel>();
    [this.listaArquivos, this.setListaArquivos] = useState<ArquivosModel[]>();
    [this.pessoasModel, this.setPessoasModel] = useState<PessoasModel>();
    [this.listaEmpresaAuto, this.setListaEmpresaAuto] = useState<any[]>();
    [this.listaPessoasAuto, this.setListaPessoasAuto] = useState<PessoasModel[]>();
    [this.pessoasFiltradas, this.setPessoasFiltradas] = useState();

    [this.pessoasId, this.setPessoasId] = useState<any>();
    [this.pessoaNome, this.setPessoaNome] = useState<string>();
    [this.mes, this.setMes] = useState<number>();
    [this.ano, this.setAno] = useState<number>();
    [this.listaMes, this.setListaMes] = useState<any[]>();
    [this.arquivoDocumentoId, this.setArquivoDocumentoId] = useState<any>();
    [this.arquivo, this.setArquivo] = useState<any>();
    [this.emailEnviado, this.setEmailEnviado] = useState<boolean>();
  }
}
