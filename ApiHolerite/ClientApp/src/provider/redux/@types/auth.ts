export interface AuthState {
  user: User | null;
}

export interface User {
  id?: string;
  idGrupo?: string;
  grupos?: any[];
  nome?: string;
  cpf?: string;
  email?: string;
  senha?: string;
  dtNascimento?: Date;
  dtCadastro?: Date;
  ativo?: boolean;
  access_token?: string;
}

export interface AuthAction {
  type: string;
  user: User | null;
}
