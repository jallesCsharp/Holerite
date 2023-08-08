import { useState } from 'react';

export default class DialogAlteracaoFilter {
  public isVisible: boolean;

  public setIsVisible: any;

  public isValido: boolean;

  public setIsValido: any;

  public title: string;

  public setTitle: any;

  public labelBotao: string;

  public setLabelBotao: any;

  public tituloLista: string | null;

  public setTituloLista: any;

  public lista: any[];

  public setLista: any;

  public valueLista: number | null;

  public setValueLista: any;

  public semProcessoSei: boolean | null;

  public setSemProcessoSei: any;

  public processoSei: any;

  public setProcessoSei: any;

  public disableProcessoSei: boolean;

  public setDisableProcessoSei: any;

  public justificativa: any;

  public setJustificativa: any;

  public valor: any;

  public setValor: any;

  public metodo: any;

  public setMetodo: any;

  constructor() {
    [this.isVisible, this.setIsVisible] = useState<boolean>(false);
    [this.isValido, this.setIsValido] = useState<boolean>(true);
    [this.title, this.setTitle] = useState<string>('Alteração Situação da Instalação');
    [this.labelBotao, this.setLabelBotao] = useState<string>('Adicionar');
    [this.tituloLista, this.setTituloLista] = useState<string | null>(null);
    [this.lista, this.setLista] = useState<any[]>([]);
    [this.valueLista, this.setValueLista] = useState<number | null>(null);
    [this.semProcessoSei, this.setSemProcessoSei] = useState<boolean | null>(null);
    [this.disableProcessoSei, this.setDisableProcessoSei] = useState<boolean>(false);
    [this.processoSei, this.setProcessoSei] = useState<any>('');
    [this.justificativa, this.setJustificativa] = useState<string>('');
    [this.valor, this.setValor] = useState<any>('');
    [this.metodo, this.setMetodo] = useState<any>('');
  }
}
