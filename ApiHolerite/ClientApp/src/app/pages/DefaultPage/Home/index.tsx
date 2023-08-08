import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages';

const HomePage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/home" exact={true} component={Home} />
      </Switch>
    </>
  );
};
export default HomePage;
