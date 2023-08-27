import React, { Fragment, useRef } from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import ArquivosFilter from '../models/ArquivosFilter';
import { classNames } from 'primereact/utils';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Button } from 'primereact/button';
import PendenteNotificacaoHoleriteController from '../controllers/PendenteNotificacaoHoleriteController';

interface Props {
  filter: ArquivosFilter;
  controller: PendenteNotificacaoHoleriteController;
}

const DataGridHoleritePendentes: React.FC<Props> = ({ filter, controller }) => {
  const dt = useRef(null);

  const pdfBodyTemplate = (rowData: any) => {
    const rowPDF = rowData;
    return (
      <React.Fragment>
        <object
          width="600px"
          height="230px"
          type="application/pdf"
          data={'data:application/pdf;base64,' + `${rowPDF.arquivo}`}
        ></object>
      </React.Fragment>
    );
  };

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

  return (
    <>
      <Card>
        <DataTable
          ref={dt}
          dataKey="id"
          value={filter.listaArquivos}
          header="stack"
          responsiveLayout="stack"
          currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 20, 30, 50]}
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
          <Column
            header="Holerite"
            align={'center'}
            style={{ textAlign: 'center' }}
            sortField="arquivo"
            filterField="arquivo"
            showFilterMatchModes={true}
            body={pdfBodyTemplate}
            filterElement={pdfBodyTemplate}
          />
          <Column
            field="emailEnviado"
            header="E-mail Enviado"
            dataType="boolean"
            bodyClassName="p-text-center"
            align={'center'}
            style={{ minWidth: '8rem' }}
            body={verifiedBodyTemplate}
            filterElement={verifiedFilterTemplate}
          />
        </DataTable>
      </Card>
    </>
  );
};

export default DataGridHoleritePendentes;
