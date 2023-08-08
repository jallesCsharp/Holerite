import React from 'react';
import Routes from './app/router';
import { addLocale, locale } from 'primereact/api';
import { localeConfig } from './provider/shared/locale';

export default function App() {
  addLocale('pt_BR', localeConfig);

  locale('pt_BR');
  return (
    <>
      <Routes />
    </>
  );
}
