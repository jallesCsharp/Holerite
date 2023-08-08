import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../provider/redux/store';
import Page from '../pages';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Page />
      </Provider>
    </BrowserRouter>
  );
};

export default Routes;
