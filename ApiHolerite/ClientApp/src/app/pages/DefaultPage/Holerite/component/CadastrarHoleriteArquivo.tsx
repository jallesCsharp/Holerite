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
    await controller.UploadHolerite(filter.file).then((result) => {
      return result;
    });
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

                {/* <Button
                  id="limpar"
                  className="p-button-secondary mr-2"
                  style={{ fontSize: '1em' }}
                  label="Limpar"
                  onClick={onLimparSolicitacao}
                /> */}

                <Button
                  id="Volar"
                  className="p-button-secondary mr-2"
                  style={{ fontSize: '1em' }}
                  label="Volar"
                />
              </div>
              {/* <div>
                <embed src={`data:application/pdf;base64,${base64STR}`} />
              </div> */}
            </Container>
          </div>
        </form>
      </Card>
    </>
  );
};
export default CadastrarHoleriteArquivo;
