import React, { Fragment, useRef } from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ListaArquivosImportadosController from '../controllers/ListaArquivosImportadosController';
import ArquivosDocumentosFilter from '../models/ArquivosDocumentosFilter';

interface Props {
  filter: ArquivosDocumentosFilter;
  controller: ListaArquivosImportadosController;
}

const DataGridListaArquivosImportados: React.FC<Props> = ({ filter, controller }) => {
  const dt = useRef(null);

  const formatData = (rowData: any) => {
    const dataCriada = new Date(rowData.created);
    const dataFormatada = dataCriada.toLocaleDateString('pt-BR', {
      timeZone: 'UTC',
    });
    return dataFormatada;
  };

  const modalDialogFooter = (
    <>
      <Button
        type="button"
        label="Fechar"
        icon="pi pi-check"
        className="p-button-danger mr-2"
        onClick={controller.modalOnFechar}
      />
    </>
  );

  const visualizarHolerite = (rowData: any) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info mr-2"
          style={{ marginRight: '.8em' }}
          onClick={() => controller.visulizarHol(rowData)}
        />
      </div>
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          style={{ marginRight: '.5em' }}
          onClick={() => controller.EcluirArquivosDoc(rowData.id)}
        />
      </div>
    );
  };

  return (
    <>
      <Card>
        <DataTable
          ref={dt}
          dataKey="id"
          value={filter.listaArquivosDocumentosModel}
          responsiveLayout="stack"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords}"
          rows={20}
          paginator
          emptyMessage="Nenhum resultado encontrado!"
        >
          <Column field="nome" header="Nome" align={'center'} style={{ textAlign: 'center' }} />
          <Column
            field="created"
            header="Data Criação"
            align={'center'}
            style={{ textAlign: 'center' }}
            body={formatData}
          />
          <Column
            field="totalImportados"
            header="Total Importados"
            align={'center'}
            style={{ textAlign: 'center' }}
          />
          <Column
            header="Arquivo Importado"
            align={'center'}
            style={{ width: '15%', height: '10%', textAlign: 'center' }}
            body={visualizarHolerite}
          ></Column>
          <Column
            header="Excluir Arquivo"
            align={'center'}
            style={{ width: '15%', height: '10%', textAlign: 'center' }}
            body={actionBodyTemplate}
          ></Column>
        </DataTable>
      </Card>

      <Dialog
        visible={filter.onVisualizar}
        modal
        header="Holerite"
        maximizable={true}
        style={{ width: '40%', height: '95%', whiteSpace: 'nowrap' }}
        footer={modalDialogFooter}
        onHide={controller.modalOnFechar}
      >
        <div className="card">
          <div className="grid p-fluid">
            <div className="col-12 md:col-12">
              <object
                width="100%"
                height="800px"
                type="application/pdf"
                data={'data:application/pdf;base64,' + `${filter.aquivosDocumentosModel?.arquivo}`}
              ></object>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DataGridListaArquivosImportados;
