import { FuncionalidadesModel } from './FuncionalidadesModel';
import { PerfilModel } from './PerfilModel';

export interface ControleAcessosModel {
  id?: string;
  created?: Date;
  updated?: Date;
  deleted?: Date;
  funcionalidadesId?: string;
  perfilId?: string;
  perfil: PerfilModel;
  funcionalidades: FuncionalidadesModel[];
  funcionalidade: FuncionalidadesModel;
}
