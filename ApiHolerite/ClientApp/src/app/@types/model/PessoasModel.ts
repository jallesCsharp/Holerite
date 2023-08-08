import { EmpresaModel } from './EmpresaModel';

export interface PessoasModel {
  Id: string;
  EmpresasId: string;
  //ProfissoesId: string;
  Created: Date;
  Updated: Date;
  Deleted: Date;
  CodigoFolha: number | null;
  Cpf: string;
  Pis: string;
  Nome: string;
  Email: string;
  //ProfissoesDto: virtual;
  Empresas: EmpresaModel;
}
