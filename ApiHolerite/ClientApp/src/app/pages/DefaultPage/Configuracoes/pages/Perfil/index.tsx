import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Perfil from './Perfil';

const PerfilPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/Configuracoes/Grupos" exact={true} component={Perfil} />
      </Switch>
    </>
  );
};
export default PerfilPage;
