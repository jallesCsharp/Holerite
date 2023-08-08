import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Props {
  data: any;
  action: any;
  hideEmpresa: boolean;
  actionExport: any | null;
  dt: any | null;
}

const GridInstacacao: React.FC<Props> = ({
  data,
  action,
  hideEmpresa = true,
  actionExport,
  dt,
}) => {
  return (
    <>
      <DataTable
        dataKey="id"
        ref={dt}
        footer={actionExport}
        value={data}
        paginator
        rows={10}
        rowsPerPageOptions={[10, 20, 30]}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} instalações"
        emptyMessage="Nenhum resultado encontrado!"
        responsiveLayout="scroll"
      >
        <Column field="CodigoInstalacao" header="Código" style={{ textAlign: 'left' }} sortable />
        <Column
          field="NomeEmpresa"
          header="Empresa"
          style={{ textAlign: 'left' }}
          sortable
          hidden={hideEmpresa}
        />
        <Column
          field="NomeInstalacao"
          header="Nome da Instalação"
          style={{ textAlign: 'left', padding: 0, width: '10em' }}
          sortable
        />

        <Column field="UF" header="UF" style={{ textAlign: 'center' }} sortable />
        <Column field="Municipio" header="Município" style={{ textAlign: 'left' }} sortable />
        <Column field="Situacao" header="Situação" style={{ textAlign: 'left' }} sortable />
        <Column
          field="acao"
          header="Ações"
          body={action}
          style={{ textAlign: 'center', width: '18%' }}
        />
      </DataTable>
    </>
  );
};
export default GridInstacacao;
