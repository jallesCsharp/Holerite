import { useState } from 'react';
import { ArquivosModel } from '../../../../@types/model/ArquivosModel';
import { EmpresaModel } from '../../../../@types/model/EmpresaModel';
import { PessoasModel } from '../../../../@types/model/PessoasModel';

export default class ArquivosFilter {
  public arquivosModel?: ArquivosModel;

  public setArquivosModel: any;

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

  public mes?: number;

  public setMes: any;

  public listaMes?: any[];

  public setListaMes: any;

  public listaEmpresaAuto?: any;

  public setlListaEmpresaAuto: any;

  public pessoaNome?: string;

  public setPessoaNome: any;

  public arquivo?: any;

  public setArquivo: any;

  public emailEnviado?: boolean;

  public setEmailEnviado: any;

  constructor() {
    [this.arquivosModel, this.setArquivosModel] = useState<ArquivosModel>();
    [this.pessoasModel, this.setPessoasModel] = useState<PessoasModel>();
    [this.listaEmpresaAuto, this.setlListaEmpresaAuto] = useState<any[]>();
    [this.listaPessoasAuto, this.setListaPessoasAuto] = useState<PessoasModel[]>();

    [this.pessoasId, this.setPessoasId] = useState<any>();
    [this.pessoaNome, this.setPessoaNome] = useState<string>();
    [this.mes, this.setMes] = useState<number>();
    [this.listaMes, this.setListaMes] = useState<any[]>();
    [this.arquivoDocumentoId, this.setArquivoDocumentoId] = useState<any>();
    [this.arquivo, this.setArquivo] = useState<any>();
    [this.emailEnviado, this.setEmailEnviado] = useState<boolean>();
  }
}
