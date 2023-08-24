import React, { useEffect } from 'react';
import HoleriteController from '../controllers/HoleriteController';
import FileFilter from '../models/FileFilter';
import CadastrarHoleriteArquivo from '../component/CadastrarHoleriteArquivo';

export const Holerite = () => {
  const filter = new FileFilter();
  const controller = new HoleriteController(filter);

  useEffect(() => {
    controller.init();
    filter.setEnviar(false);
  }, []);

  return (
    <>
      <CadastrarHoleriteArquivo filter={filter} controller={controller} />
    </>
  );
};
export default Holerite;
