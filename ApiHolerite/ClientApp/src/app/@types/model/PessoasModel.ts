import { ArquivosModel } from './ArquivosModel';
import { EmpresaModel } from './EmpresaModel';
import { ProfissoesModel } from './ProfissoesModel';

export interface PessoasModel {
  id: string;
  empresasId: string;
  profissoesId: string;
  created: Date;
  updated: Date;
  deleted: Date;
  admissao: Date;
  nascimento: Date;
  codigoFolha: string;
  cpf: string;
  pis: string;
  nome: string;
  email: string;
  salarioBase: string;
  profissoes: ProfissoesModel;
  empresas: EmpresaModel;
  arquivos: ArquivosModel[];
}
