import { PessoasModel } from './PessoasModel';

export interface ArquivosModel {
  Id: string;
  Created: Date;
  Updated: Date;
  Deleted: Date;
  PessoasId: string;
  ArquivoDocumentoId: string;
  Mes: number | null;
  NomeArquivo: string;
  Arquivo: BinaryType;
  EmailEnviado: boolean;
  Pessoas: PessoasModel;
}
