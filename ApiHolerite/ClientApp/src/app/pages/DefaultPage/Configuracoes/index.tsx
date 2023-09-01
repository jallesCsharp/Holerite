import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArquivoPage from './pages/aquivos';
import PerfilPage from './pages/Perfil';

const ConfiguracoesPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/Configuracoes/Perfil" exact={true} component={PerfilPage} />
        <Route path="/Configuracoes/Arquivos" exact={false} component={ArquivoPage} />
      </Switch>
    </>
  );
};
export default ConfiguracoesPage;
