import React, { useEffect } from 'react';
import ArquivosFilter from '../models/ArquivosFilter';
import DataGridHoleritePendentes from '../component/DataGridHoleritePendentes';
import PendenteNotificacaoHoleriteController from '../controllers/PendenteNotificacaoHoleriteController';

export const PendenteNotificacao = () => {
  const filter = new ArquivosFilter();
  const controller = new PendenteNotificacaoHoleriteController(filter);

  useEffect(() => {
    controller.init();
  }, []);

  return (
    <>
      <DataGridHoleritePendentes filter={filter} controller={controller} />
    </>
  );
};
export default PendenteNotificacao;
