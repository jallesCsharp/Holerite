import { EmpresaModel } from './EmpresaModel';
import { ProfissoesModel } from './ProfissoesModel';

export interface PessoasModel {
  id: string;
  empresasId: string;
  profissoesId: string;
  created: Date;
  updated: Date;
  deleted: Date;
  codigoFolha: number;
  cpf: string;
  pis: string;
  nome: string;
  email: string;
  profissoes: ProfissoesModel;
  empresas: EmpresaModel;
}
