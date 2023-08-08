import { GrupoModel } from './GrupoModel';

export interface LoginModel {
  Id?: string;
  Nome?: string;
  Cpf?: string;
  Email?: string;
  Senha?: string;
  Dtnascimento?: Date;
  Ativo?: boolean;
  Access_token?: string;
  Grupos?: GrupoModel[];
}
