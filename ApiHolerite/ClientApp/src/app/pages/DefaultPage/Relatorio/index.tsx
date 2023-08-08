import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { InstalacaoEmpresa } from './pages/InstalacaoEmpresa';
import { HistoricoAlteracaoInstalacao } from './pages/HistoricoAlteracaoInstalacao';

const RelatorioPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/relatorio/empresa" exact={true} component={InstalacaoEmpresa} />
        <Route
          path="/relatorio/historico-instalacao"
          exact={true}
          component={HistoricoAlteracaoInstalacao}
        />
      </Switch>
    </>
  );
};
export default RelatorioPage;
