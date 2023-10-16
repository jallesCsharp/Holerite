import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Holerite from './pages/Holerite';
import HoleriteLista from './pages/HoleriteLista';
import PendenteNotificacao from './pages/PendenteNotificacao';
import ListaArquivosImportados from './pages/ListaArquivosImportados';

const HoleritePage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/holerite/arquivo" exact={true} component={Holerite} />
        <Route path="/holerite/HoleriteLista" exact={true} component={HoleriteLista} />
        <Route path="/holerite/PendenteNotificacao" exact={true} component={PendenteNotificacao} />
        <Route
          path="/holerite/ListaArquivosImportados"
          exact={true}
          component={ListaArquivosImportados}
        />
      </Switch>
    </>
  );
};
export default HoleritePage;
