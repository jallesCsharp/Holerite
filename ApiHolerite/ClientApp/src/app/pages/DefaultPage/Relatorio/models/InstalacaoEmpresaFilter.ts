import { useState } from 'react';

export default class InstalacaoEmpresaFilter {
  public grid: any;

  public setGrid: any;

  public listaSituacaoInstacacao: any;

  public setListaSituacaoInstacacao: any;

  public listaPais: any;

  public setListaPais: any;

  public listaUf: any;

  public setListaUf: any;

  public listaMunicipio: any;

  public setListaMunicipio: any;

  public listaSituacaoEmpresa: any;

  public setListaSituacaoEmpresa: any;

  public nomeEmpresa: string;

  public setNomeEmpresa: any;

  public nomeInstalacao: string;

  public setNomeInstalacao: any;

  public situacaoInstalacao: any;

  public setSituacaoInstalacao: any;

  public situacaoEmpresa: string | null;

  public setSituacaoEmpresa: any;

  public pais: number | null;

  public setPais: any;

  public uf: number | null;

  public setUf: any;

  public municipio: number | null;

  public setMunicipio: any;

  constructor() {
    [this.grid, this.setGrid] = useState<any>();
    [this.listaSituacaoInstacacao, this.setListaSituacaoInstacacao] = useState<any[]>([
      { name: 'Ativo', value: 'A' },
      { name: 'Inativo', value: 'S' },
    ]);
    [this.listaPais, this.setListaPais] = useState<any>();
    [this.listaUf, this.setListaUf] = useState<any>();
    [this.listaMunicipio, this.setListaMunicipio] = useState<any>();
    [this.listaSituacaoEmpresa, this.setListaSituacaoEmpresa] = useState<any>();
    [this.nomeEmpresa, this.setNomeEmpresa] = useState<string>('');
    [this.nomeInstalacao, this.setNomeInstalacao] = useState<string>('');
    [this.listaSituacaoEmpresa, this.setListaSituacaoEmpresa] = useState<any | any[]>([]);
    [this.pais, this.setPais] = useState<number | null>(null);
    [this.uf, this.setUf] = useState<number | null>(null);
    [this.municipio, this.setMunicipio] = useState<number | null>(null);
    [this.situacaoInstalacao, this.setSituacaoInstalacao] = useState<string | null>(null);
    [this.situacaoEmpresa, this.setSituacaoEmpresa] = useState<string | null>(null);
  }
}
