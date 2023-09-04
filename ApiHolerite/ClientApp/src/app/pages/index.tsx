import React from 'react';
import AuthService from '../../provider/services/authService';
import DefaultPage from './DefaultPage';
import LoginPage from './Login';

export default function Page() {
  const authService = new AuthService();

  console.log('authService.isAuthenticated');
  console.log(authService.isAuthenticated());

  if (authService.isAuthenticated()) {
    return <DefaultPage />;
  } else {
    return <LoginPage />;
  }
}
