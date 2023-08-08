import React, { useEffect } from 'react';
import LogoutController from '../controllers/logoutController';

export default function Logout() {
  const controller = new LogoutController();

  useEffect(() => {
    controller.init();
  }, []);

  return <></>;
}
