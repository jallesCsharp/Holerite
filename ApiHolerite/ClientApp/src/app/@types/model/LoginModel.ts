import { FuncionalidadesModel } from './FuncionalidadesModel';

export interface LoginModel {
  id?: string;
  nome?: string;
  cpf?: string;
  email?: string;
  password?: string;
  dtnascimento?: Date;
  ativo?: boolean;
  jwt?: string;
  funcionalidades?: FuncionalidadesModel[];
}
