import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AuthService from '../../../../../provider/services/authService';
import PerfilComponent from '../component/PerfilComponent';
import PerfilController from '../controllers/PerfilController';
import PerfilFilter from '../models/PerfilFilter';
// import ToastService from '../../../../../provider/services/toastService';

export const Perfil = () => {
  const id = useParams();
  const filter = new PerfilFilter();
  const controller = new PerfilController(filter);
  const auth = new AuthService();

  useEffect(() => {
    controller.init();
    let perfilID = Object.values(id);

    if (perfilID.length === 0) {
      filter.setIsVisibleVoltar(perfilID.length);
      const user = auth.getUser();
      controller.getPesquisarPerfilUsuario(user.pessoasId);
    } else {
      filter.setIsVisibleVoltar(perfilID.length);
      controller.getPesquisarPerfilUsuario(perfilID[0]);
    }
  }, []);
  return (
    <>
      <h2>Perfil</h2>
      <PerfilComponent filter={filter} controller={controller}></PerfilComponent>
    </>
  );
};
export default Perfil;
