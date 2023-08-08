import React, { useEffect } from 'react';
import HoleriteController from '../controllers/HoleriteController';
import FileFilter from '../models/FileFilter';
import CadastrarHoleriteArquivo from '../component/CadastrarHoleriteArquivo';

export const Holerite = () => {
  const filter = new FileFilter();
  const controller = new HoleriteController(filter);

  useEffect(() => {
    controller.init();
    filter.setEniar(false);
  }, []);

  return (
    <>
      <CadastrarHoleriteArquivo filter={filter} controller={controller} />
      {/* <Card title="Cadastrar Holerite" className={'mb-3'}>
        <div className="card flex justify-content-center">
          <FileUpload
            mode="basic"
            style={{ marginRight: '.5em' }}
            chooseLabel="Adicionar Arquivo"
            auto={false}
            customUpload={true}
            uploadHandler={carregarUpload}
          />
        </div>
      </Card> */}
    </>
  );
};
export default Holerite;
