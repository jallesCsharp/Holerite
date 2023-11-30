import { FuncionalidadesModel } from './FuncionalidadesModel';
import { PerfilModel } from './PerfilModel';

export interface ControleAcessosModel {
  id?: string | null;
  created?: Date | null;
  updated?: Date | null;
  deleted?: Date | null;
  funcionalidadesId?: string | null;
  perfilId?: string | null;
  perfil: PerfilModel | null;
  funcionalidades: FuncionalidadesModel[];
}
