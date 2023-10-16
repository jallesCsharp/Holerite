import React, { Fragment, useRef } from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import ArquivosFilter from '../models/ArquivosFilter';
import { classNames } from 'primereact/utils';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Button } from 'primereact/button';
import PendenteNotificacaoHoleriteController from '../controllers/PendenteNotificacaoHoleriteController';
import { Dialog } from 'primereact/dialog';

interface Props {
  filter: ArquivosFilter;
  controller: PendenteNotificacaoHoleriteController;
}

const DataGridHoleritePendentes: React.FC<Props> = ({ filter, controller }) => {
  const dt = useRef(null);

  const verifiedBodyTemplate = (rowData: any) => {
    return (
      <i
        className={classNames('pi', {
          'true-icon pi-check-circle': rowData.verified,
          'false-icon pi-times-circle': !rowData.verified,
        })}
      ></i>
    );
  };

  const verifiedFilterTemplate = (options: { value: any; filterCallback: (arg0: any) => any }) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e: any) => options.filterCallback(e.value)}
      />
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="flex justify-content-end flex-wrap card-container  export-buttons">
          <Button
            disabled={filter.listaArquivos?.length === 0}
            label="Confirmar Envio do E-mail"
            icon="pi pi-envelope"
            className="p-button-success mr-2"
            style={{ marginRight: '.5em' }}
            onClick={() => controller.ConfirmarEnvioEmail()}
          />
        </div>
      </React.Fragment>
    );
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

  return (
    <>
      <Card>
        <DataTable
          ref={dt}
          dataKey="id"
          value={filter.listaArquivos}
          responsiveLayout="stack"
          currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          rows={50}
          paginator
          sortOrder={-1}
          emptyMessage="Nenhum resultado encontrado!"
          footer={leftToolbarTemplate}
        >
          <Column
            field="pessoas.nome"
            header="Nome"
            align={'center'}
            style={{ textAlign: 'center' }}
          />
          <Column
            field="pessoas.email"
            header="E-Mail"
            align={'center'}
            style={{ textAlign: 'center' }}
          />
          <Column
            field="pessoas.empresas.nomeEmpresa"
            header="Nome Empresa"
            align={'center'}
            style={{ textAlign: 'center' }}
          />
          {/* <Column
            header="Holerite"
            align={'center'}
            style={{ textAlign: 'center' }}
            sortField="arquivo"
            filterField="arquivo"
            showFilterMatchModes={true}
            body={pdfBodyTemplate}
            filterElement={pdfBodyTemplate}
          /> */}
          <Column
            header="Holerite"
            align={'center'}
            style={{ width: '15%', height: '10%', textAlign: 'center' }}
            body={visualizarHolerite}
          ></Column>
          <Column
            field="emailEnviado"
            header="E-mail Enviado"
            dataType="boolean"
            bodyClassName="p-text-center"
            align={'center'}
            style={{ minWidth: '.8em' }}
            body={verifiedBodyTemplate}
            filterElement={verifiedFilterTemplate}
          />
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
                data={'data:application/pdf;base64,' + `${filter.arquivosModel?.arquivo}`}
              ></object>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DataGridHoleritePendentes;
