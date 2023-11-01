import React, { useEffect } from 'react';
import PerfilGruposController from '../../controllers/Perfil/PerfilGruposController';
import PerfilGruposFilter from '../../models/Perfil/PerfilGruposFilter';
import DataGridPerfilGrupos from '../../component/Perfil/DataGridPerfilGrupos';

const PerfilGrupos: React.FC = () => {
  const filter = new PerfilGruposFilter();
  const controller = new PerfilGruposController(filter);

  useEffect(() => {
    controller.init();
  }, []);

  return (
    <>
      <DataGridPerfilGrupos filter={filter} controller={controller} />
    </>
  );
};
export default PerfilGrupos;
