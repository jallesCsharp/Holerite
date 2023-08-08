import React from 'react';
import { Link } from 'react-router-dom';
import { Login } from './pages/Login';
import Logout from './pages/Logout';

export const LoginPage: React.FC = () => {
  return (
    <>
      <Link to="/login" component={Login} />
      <Link to="/logout" component={Logout} />
    </>
  );
};
export default LoginPage;
