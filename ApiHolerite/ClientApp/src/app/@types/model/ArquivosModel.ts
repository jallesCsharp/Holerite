import { PessoasModel } from './PessoasModel';

export interface ArquivosModel {
  id: string;
  created: Date;
  updated: Date;
  deleted: Date;
  pessoasId: string;
  arquivoDocumentoId: string;
  mes: string | null;
  nomeArquivo: string;
  arquivo: BinaryType;
  emailEnviado: boolean;
  pessoas: PessoasModel;
}
