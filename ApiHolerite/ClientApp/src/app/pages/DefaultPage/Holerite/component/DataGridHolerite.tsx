import React, { Fragment, useRef } from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import ArquivosFilter from '../models/ArquivosFilter';
import ArquivosHoleriteController from '../controllers/ArquivosHoleriteController';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';

interface Props {
  filter: ArquivosFilter;
  controller: ArquivosHoleriteController;
}

const DataGridHolerite: React.FC<Props> = ({ filter, controller }) => {
  const dt = useRef(null);

  const verifiedFilterTemplate = (options: any) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e: any) => options.filterCallback(e.value)}
      />
    );
  };

  const verifiedBodyTemplate = (rowData: any) => {
    return (
      <i
        className={classNames('pi', {
          'true-icon pi-check-circle': rowData.emailEnviado,
          'false-icon pi-times-circle': !rowData.emailEnviado,
        })}
      ></i>
    );
  };

  const visualizarHolerite = (rowData: any) => {
    console.log(rowData);
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
          paginator
          rows={20}
          className="datatable-responsive"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords}"
          emptyMessage="Nenhum resultado encontrado!"
          responsiveLayout="scroll"
        >
          <Column
            field="pessoas.nome"
            header="Nome"
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
            header="E-mail Enviado"
            field="emailEnviado"
            dataType="boolean"
            bodyClassName="p-text-center"
            align={'center'}
            style={{ minWidth: '8rem' }}
            body={verifiedBodyTemplate}
            filterElement={verifiedFilterTemplate}
          />
          <Column field="Acoes" header="Ações" align={'center'} style={{ textAlign: 'center' }} />
        </DataTable>
      </Card>
    </>
  );
};

export default DataGridHolerite;
