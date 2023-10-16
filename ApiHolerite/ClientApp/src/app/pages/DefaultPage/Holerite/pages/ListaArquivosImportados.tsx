import React, { useEffect } from 'react';
import DataGridListaArquivosImportados from '../component/DataGridListaArquivosImportados';
import ArquivosDocumentosFilter from '../models/ArquivosDocumentosFilter';
import ListaArquivosImportadosController from '../controllers/ListaArquivosImportadosController';

export const ListaArquivosImportados = () => {
  const filter = new ArquivosDocumentosFilter();
  const controller = new ListaArquivosImportadosController(filter);

  useEffect(() => {
    controller.init();
  }, []);

  return (
    <>
      <DataGridListaArquivosImportados filter={filter} controller={controller} />
    </>
  );
};
export default ListaArquivosImportados;
