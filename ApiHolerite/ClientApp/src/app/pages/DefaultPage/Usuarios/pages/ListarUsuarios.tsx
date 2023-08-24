import React, { useEffect } from 'react';
import UsuariosFilter from '../models/UsuariosFilter';
import ListaUsuariosController from '../controllers/ListaUsuariosController';
import DataGridUsuarios from '../component/DataGridUsuarios';

export const ListarUsuarios = () => {
  const filter = new UsuariosFilter();
  const controller = new ListaUsuariosController(filter);

  useEffect(() => {
    controller.init();
  }, []);

  return (
    <>
      <DataGridUsuarios filter={filter} controller={controller} />
    </>
  );
};
export default ListarUsuarios;
