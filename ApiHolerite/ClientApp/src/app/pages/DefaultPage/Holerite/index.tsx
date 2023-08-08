import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Holerite from './pages/Holerite';
import HoleriteLista from './pages/HoleriteLista';

const HoleritePage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/holerite/arquivo" exact={true} component={Holerite} />
        <Route path="/holerite/holerite-lista" exact={true} component={HoleriteLista} />
      </Switch>
    </>
  );
};
export default HoleritePage;
