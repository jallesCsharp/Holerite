import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Grupos from './Grupos';

const GruposPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/Configuracoes/Grupos" exact={true} component={Grupos} />
      </Switch>
    </>
  );
};
export default GruposPage;
