import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Arquivos from './Arquivos';

const ArquivoPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/Configuracoes/Arquivos" exact={true} component={Arquivos} />
      </Switch>
    </>
  );
};
export default ArquivoPage;
