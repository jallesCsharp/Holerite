//import { InputText } from 'primereact/inputtext';
import React, { useEffect } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import AquivoController from '../../controllers/aquivos/aquivoController';

const Arquivos: React.FC = () => {
  const controller = new AquivoController();

  useEffect(() => {
    controller.init();
  }, []);

  const customBase64Uploader = async (event: any) => {
    const file = event.files[0];
    const formData = new FormData();
    formData.append('FormFile', file);
    formData.append('File', file);
    formData.append('FileName', file.name);

    controller.Upload(formData);

    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob());
    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      reader.result;
    };
  };

  return (
    <>
      <React.Fragment>
        <>
          <div className="form col-8">
            <h3>
              <span style={{ marginRight: '.5em' }}>
                Cadastrar Funcionarios | Empresa | Cargos dos Funcionarios
              </span>
            </h3>
            <br />
            <div className="card flex justify-content-center">
              <FileUpload
                uploadLabel="Upload"
                chooseLabel="Adicionar Arquivo"
                mode="basic"
                name="Upload"
                url="/api/upload"
                accept="/*"
                style={{ marginRight: '.4em' }}
                customUpload
                uploadHandler={customBase64Uploader}
              />
              <Button
                icon="pi pi-download"
                label="Baixar Modelo"
                className="p-button"
                style={{ marginRight: '.4em' }}
                onClick={() => controller.DowloadFile()}
              />
            </div>
          </div>
        </>
      </React.Fragment>
    </>
  );
};

export default Arquivos;
