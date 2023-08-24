import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Holerite from './pages/Holerite';
import HoleriteLista from './pages/HoleriteLista';
import PendenteNotificacao from './pages/PendenteNotificacao';

const HoleritePage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/holerite/arquivo" exact={true} component={Holerite} />
        <Route path="/holerite/holeriteLista" exact={true} component={HoleriteLista} />
        <Route
          path="/holerite/holeritePendenteNotificacao"
          exact={true}
          component={PendenteNotificacao}
        />
      </Switch>
    </>
  );
};
export default HoleritePage;
