import React from 'react';
import FileFilter from '../models/FileFilter';
import HoleriteController from '../controllers/HoleriteController';
import { Card } from 'primereact/card';
import { FileUpload, FileUploadSelectParams } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import Container from '../../../../../provider/components/Container';
import ToastService from '../../../../../provider/services/toastService';

interface Props {
  filter: FileFilter;
  controller: HoleriteController;
}

const CadastrarHoleriteArquivo: React.FC<Props> = ({ filter, controller }) => {
  function onLimparupload() {
    filter.setEnviar(false);
    filter.setLoading(false);
  }

  async function onAdicionarArquivo(event: FormData) {
    filter.setEnviar(true);
    filter.setFile(event);
    ToastService.showSuccess('Arquivo adicionado com Sucesso!.');
  }

  async function onFileUpload(event: FileUploadSelectParams) {
    await controller.customBase64Uploader(event).then((result) => onAdicionarArquivo(result));
  }

  async function enviarSolicitacao() {
    await controller.UploadHolerite(filter.file);
    filter.setLoading(false);
    filter.setEnviar(false);
  }

  return (
    <>
      <Card title="Cadastrar Holerite" className={'mb-3'}>
        <form
          id="holerite-cadastrar"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            controller.voltaNav();
          }}
        >
          <div className="grid">
            <Container col={4} sm={5}>
              <FileUpload
                accept=".PDF"
                mode="basic"
                chooseLabel={'Procurar Arquivo'}
                customUpload={false}
                auto={false}
                onClear={onLimparupload}
                onSelect={(event) => onFileUpload(event)}
              />
            </Container>

            <Container col={5}>
              <></>
            </Container>

            <Container col={12} sm={12} md={12}>
              <div className="button">
                {
                  <Button
                    id="enviar"
                    className="p-component p-button-primary mr-2"
                    autoFocus={true}
                    style={{ fontSize: '1em' }}
                    icon="pi pi-save"
                    label="Enviar"
                    loading={filter.onLoading}
                    onClick={enviarSolicitacao}
                    disabled={!filter.onEniar}
                  />
                }
              </div>
            </Container>
          </div>
        </form>
      </Card>
      <br />
      {filter.errorStatus && (
        <Card title="Error Validar (Código Folha Holerite) ou (Empresa)" className={'mb-3'}>
          {filter.msgerror?.map((item, index) => {
            return (
              <div key={index}>
                <hr />
                <h2>{item}</h2>
              </div>
            );
          })}
        </Card>
      )}
      {filter.sucessoStatus && (
        <Card title="Sucesso!!" className={'mb-3'}>
          {filter.msgSucesso?.map((item, index) => {
            return (
              <div key={index}>
                <h2>{item}</h2>
                <hr />
              </div>
            );
          })}
        </Card>
      )}
    </>
  );
};
export default CadastrarHoleriteArquivo;
