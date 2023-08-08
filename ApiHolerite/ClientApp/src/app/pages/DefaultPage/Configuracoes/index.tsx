import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArquivoPage from './pages/aquivos';
import GruposPage from './pages/grupos';

const ConfiguracoesPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/Configuracoes/Grupos" exact={true} component={GruposPage} />
        <Route path="/Configuracoes/Arquivos" exact={false} component={ArquivoPage} />
      </Switch>
    </>
  );
};
export default ConfiguracoesPage;
