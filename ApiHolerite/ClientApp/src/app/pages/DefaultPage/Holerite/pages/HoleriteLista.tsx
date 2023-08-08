import React, { useEffect } from 'react';
import ArquivosFilter from '../models/ArquivosFilter';
import ArquivosHoleriteController from '../controllers/ArquivosHoleriteController';
import FilterHolerite from '../component/FilterHolerite';

export const HoleriteLista = () => {
  const filter = new ArquivosFilter();
  const controller = new ArquivosHoleriteController(filter);

  useEffect(() => {
    controller.init();
  }, []);

  return (
    <>
      <FilterHolerite filter={filter} controller={controller} />
    </>
  );
};
export default HoleriteLista;
