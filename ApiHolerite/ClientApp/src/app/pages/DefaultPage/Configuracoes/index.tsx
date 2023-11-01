import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArquivoPage from './pages/aquivos';
import PerfilGruposPage from './pages/Perfil';

const ConfiguracoesPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/Configuracoes/PerfilGrupos" exact={true} component={PerfilGruposPage} />
        {/* <Route
          path="/Configuracoes/AdicionarPerfilGrupos"
          exact={true}
          component={PerfilGruposPage}
        /> */}
        <Route path="/Configuracoes/Arquivos" exact={false} component={ArquivoPage} />
      </Switch>
    </>
  );
};
export default ConfiguracoesPage;
