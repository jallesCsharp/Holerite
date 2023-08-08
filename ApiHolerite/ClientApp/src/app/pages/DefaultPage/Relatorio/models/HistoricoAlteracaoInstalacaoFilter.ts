import { useState } from 'react';

export default class HistoricoAlteracaoInstalacaoFilter {
  public grid: any;

  public setGrid: any;

  public listaPais: any;

  public setListaPais: any;

  public listaUf: any;

  public setListaUf: any;

  public listaMunicipio: any;

  public setListaMunicipio: any;

  public nomeEmpresa: string;

  public setNomeEmpresa: any;

  public nomeInstalacao: string;

  public setNomeInstalacao: any;

  public nomeUsuario: string;

  public setNomeUsuario: any;

  public pais: number | null;

  public setPais: any;

  public uf: number | null;

  public setUf: any;

  public municipio: number | null;

  public setMunicipio: any;

  public listaCampos: any;

  public setListaCampos: any;

  public campo: string;

  public setCampo: any;

  constructor() {
    [this.grid, this.setGrid] = useState<any>();
    [this.listaPais, this.setListaPais] = useState<any>();
    [this.listaUf, this.setListaUf] = useState<any>();
    [this.listaMunicipio, this.setListaMunicipio] = useState<any>();
    [this.listaCampos, this.setListaCampos] = useState<any>();
    [this.nomeEmpresa, this.setNomeEmpresa] = useState<string>('');
    [this.nomeInstalacao, this.setNomeInstalacao] = useState<string>('');
    [this.nomeUsuario, this.setNomeUsuario] = useState<string>('');
    [this.pais, this.setPais] = useState<number | null>(null);
    [this.uf, this.setUf] = useState<number | null>(null);
    [this.municipio, this.setMunicipio] = useState<number | null>(null);
    [this.campo, this.setCampo] = useState<any>(null);
  }
}
