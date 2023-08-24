import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Perfil from './pages/Perfil';
import ListarUsuarios from './pages/ListarUsuarios';

const UsuariosPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/usuarios/perfil/:id" exact={true} component={Perfil} />
        <Route path="/usuarios/listar" exact={true} component={ListarUsuarios} />
      </Switch>
    </>
  );
};
export default UsuariosPage;
