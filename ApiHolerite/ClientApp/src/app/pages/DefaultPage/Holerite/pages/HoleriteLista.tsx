import React, { useEffect } from 'react';
import ArquivosFilter from '../models/ArquivosFilter';
import ArquivosHoleriteController from '../controllers/ArquivosHoleriteController';
import FilterHolerite from '../component/FilterHolerite';
import DataGridHolerite from '../component/DataGridHolerite';

export const HoleriteLista = () => {
  const filter = new ArquivosFilter();
  const controller = new ArquivosHoleriteController(filter);

  useEffect(() => {
    controller.init();
  }, []);

  // const dt = useRef(null);

  return (
    <>
      <FilterHolerite filter={filter} controller={controller} />
      <DataGridHolerite filter={filter} controller={controller} />
    </>
  );
};
export default HoleriteLista;
