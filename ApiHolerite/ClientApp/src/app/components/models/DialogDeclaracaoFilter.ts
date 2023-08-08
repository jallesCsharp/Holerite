import { useState } from 'react';

export default class DialogDeclaracaoFilter {
  public listaEmpresa: any[] | [];

  public setListaEmpresa: any;

  public listaEmpresHabilitadas: any[] | [];

  public setListaEmpresHabilitadas: any;

  public listaComboEmpresa: any[] | [];

  public setlistaComboEmpresa: any;

  public tituloDialog: string;

  public setTituloDialog: any;

  public disable: boolean;

  public setDisable: any;

  public isVisible: boolean;

  public setIsVisible: any;

  public isValido: boolean;

  public setIsValido: any;

  public labelBotao: string;

  public setLabelBotao: any;

  public nomeInstacao: string;

  public setNomeInstacao: any;

  public tituloLista: string | null;

  public setTituloLista: any;

  public listTipoDeclaracao: any[];

  public setListTipoDeclaracao: any;

  public idTipoDeclaracao: number | null;

  public setIdTipoDeclaracao: any;

  public idInstalacaoDeclaracao: number | null;

  public setIdInstalacaoDeclaracao: any;

  public dataEmissao: Date | undefined;

  public setDataEmissao: any;

  public dataValidade: Date | undefined;

  public setDataValidade: any;

  public file: File[] | null;

  public setFile: any;

  public base64: any | null;

  public setBase64: any;

  public cpfNumero: string;

  public setCpfNumero: any;

  public nome: string;

  public setNome: any;

  public codigoRegistro: string;

  public setCodigoRegistro: any;

  public telefone: string;

  public setTelefone: any;

  public email: string;

  public setEmail: any;

  public concordo: boolean;

  public setConcordo: any;

  public idEmpresaCombo: number | null;

  public setIdEmpresaCombo: any | null;

  public IdInstalacaoEmpresa: number | null;

  public setIdInstalacaoEmpresa: any | null;

  public CNPJEmpresa: string | null;

  public setCNPJEmpresa: any;

  public nomeArquivo: string;

  public setNomeArquivo: any;

  public tipoExtencao: string;

  public setTipoExtencao: any;

  public nomeEmpresa: string;

  public setNomeEmpresa: any;

  public idArquivo: any;

  public setidArquivo: any;

  constructor() {
    [this.tituloDialog, this.setTituloDialog] = useState<string>('Adicionar declaração');
    [this.listaEmpresa, this.setListaEmpresa] = useState<any[] | []>([]);
    [this.listaEmpresHabilitadas, this.setListaEmpresHabilitadas] = useState<any[] | []>([]);
    [this.listaComboEmpresa, this.setlistaComboEmpresa] = useState<any[] | []>([]);
    [this.disable, this.setDisable] = useState<boolean>(false);
    [this.isVisible, this.setIsVisible] = useState<boolean>(false);
    [this.isValido, this.setIsValido] = useState<boolean>(true);
    [this.labelBotao, this.setLabelBotao] = useState<string>('Adicionar');
    [this.nomeInstacao, this.setNomeInstacao] = useState<string>('');
    [this.tituloLista, this.setTituloLista] = useState<string | null>(null);
    [this.listTipoDeclaracao, this.setListTipoDeclaracao] = useState<any[]>([]);
    [this.idInstalacaoDeclaracao, this.setIdInstalacaoDeclaracao] = useState<number | null>(null);
    [this.idTipoDeclaracao, this.setIdTipoDeclaracao] = useState<number | null>(null);
    [this.dataEmissao, this.setDataEmissao] = useState<Date | undefined>(undefined);
    [this.dataValidade, this.setDataValidade] = useState<Date | undefined>(undefined);
    [this.file, this.setFile] = useState<File[] | null>(null);
    [this.base64, this.setBase64] = useState<any | null>(null);
    [this.tipoExtencao, this.setTipoExtencao] = useState<string>('');
    [this.nomeArquivo, this.setNomeArquivo] = useState<string>('');
    [this.cpfNumero, this.setCpfNumero] = useState<string>('');
    [this.nome, this.setNome] = useState<string>('');
    [this.codigoRegistro, this.setCodigoRegistro] = useState<string>('');
    [this.telefone, this.setTelefone] = useState<string>('');
    [this.email, this.setEmail] = useState<string>('');
    [this.concordo, this.setConcordo] = useState<boolean>(false);
    [this.idEmpresaCombo, this.setIdEmpresaCombo] = useState<number | null>(null);
    [this.IdInstalacaoEmpresa, this.setIdInstalacaoEmpresa] = useState<number | null>(null);
    [this.CNPJEmpresa, this.setCNPJEmpresa] = useState<string | null>(null);
    [this.nomeEmpresa, this.setNomeEmpresa] = useState<string>('');
    [this.idArquivo, this.setidArquivo] = useState<any>();
  }
}
