import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PerfilGrupos from './PerfilGrupos';

const PerfilGruposPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/Configuracoes/PerfilGrupos" exact={true} component={PerfilGrupos} />
        <Route path="/Configuracoes/AdicionarPerfilGrupos" exact={true} component={PerfilGrupos} />
      </Switch>
    </>
  );
};
export default PerfilGruposPage;
