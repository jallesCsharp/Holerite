import { GrupoModel } from './GrupoModel';

export interface LoginModel {
  id?: string;
  nome?: string;
  cpf?: string;
  email?: string;
  senha?: string;
  dtnascimento?: Date;
  ativo?: boolean;
  access_token?: string;
  grupos?: GrupoModel[];
}
