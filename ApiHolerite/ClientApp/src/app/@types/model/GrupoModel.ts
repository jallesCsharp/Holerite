import { User } from '../../../provider/redux/@types/auth';

export interface GrupoModel {
  id?: string;
  idPessoa?: string;
  nomeGrupo?: string;
  status?: boolean;
  pessoa?: User;
}
