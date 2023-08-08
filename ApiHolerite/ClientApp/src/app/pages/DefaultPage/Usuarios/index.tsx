import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Perfil from './pages/Perfil';

const UsuariosPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/usuario" exact={true} component={Clientes} />
        <Route path="/perfil" exact={true} component={Perfil} />
      </Switch>
    </>
  );
};
export default UsuariosPage;
