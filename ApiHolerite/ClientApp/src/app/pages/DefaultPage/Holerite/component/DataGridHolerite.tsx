import React, { Fragment, useRef } from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import ArquivosFilter from '../models/ArquivosFilter';
import ArquivosHoleriteController from '../controllers/ArquivosHoleriteController';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { classNames } from 'primereact/utils';

interface Props {
  filter: ArquivosFilter;
  controller: ArquivosHoleriteController;
}

const DataGridHolerite: React.FC<Props> = ({ filter }) => {
  const dt = useRef(null);

  // const pdfBodyTemplate = (rowData: any) => {
  //   // let blob = new Blob([rowData.arquivo], { type: 'application/pdf' });
  //   // let url = URL.createObjectURL(blob);
  //   // return <img src={url} width="100" height="100" />;
  //   return <iframe width="100%" height="330px" src={rowData.arquivo}></iframe>;
  // };

  const pdfBodyTemplate = (rowData: any) => {
    const rowPDF = rowData;
    return (
      <React.Fragment>
        {/* <iframe width="400px" height="230px" src={rowPDF.arquivo}></iframe> */}
        <object
          width="600px"
          height="230px"
          type="application/pdf"
          data={'data:application/pdf;base64,' + `${rowPDF.arquivo}`}
        ></object>
      </React.Fragment>
    );
  };

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

  const footerGrid = () => {
    return (
      <div className="flex justify-content-end flex-wrap card-container  export-buttons">
        {/* <Button
          type="button"
          icon="pi pi-file"
          className="mr-2"
          data-pr-tooltip="CSV"
          label={'Exportar CSV'}
          onClick={() => controller.exportCSV(dt)}
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          onClick={() => controller.exportPdf(filter.grid, 'Relatorio_historico_instalacaes', 'a4')}
          className="p-button-warning mr-2"
          label={'Exportar PDF'}
          data-pr-tooltip="PDF"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          className="p-button-success mr-2"
          label={'Exportar XLS'}
          data-pr-tooltip="XLS"
          onClick={() => controller.exportExcel(filter.grid, 'Relatorio_historico_instalacaes')}
        /> */}
      </div>
    );
  };

  return (
    <>
      <Card>
        <DataTable
          ref={dt}
          dataKey="id"
          footer={footerGrid}
          value={filter.listaArquivos}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 30]}
          className="datatable-responsive"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
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
          {/* <Column header="Image" body={pdfBodyTemplate}></Column> */}
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
            header="E-mail Enviado"
            field="emailEnviado"
            dataType="boolean"
            bodyClassName="p-text-center"
            align={'center'}
            style={{ minWidth: '8rem' }}
            body={verifiedBodyTemplate}
            filterElement={verifiedFilterTemplate}
          />
          {/* <Column field="mes" header="Mês" style={{ textAlign: 'left' }} sortable /> */}
          <Column field="Acoes" header="Ações" align={'center'} style={{ textAlign: 'center' }} />
        </DataTable>
      </Card>
    </>
  );
};

export default DataGridHolerite;
