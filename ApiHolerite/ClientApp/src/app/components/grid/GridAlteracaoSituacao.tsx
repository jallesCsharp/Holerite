import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Props {
  data: any;
}

const GridAlteracaoSituacao: React.FC<Props> = ({ data }) => {
  return (
    <DataTable
      dataKey="id"
      value={data}
      paginator
      rows={10}
      rowsPerPageOptions={[10, 20, 30]}
      className="datatable-responsive"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} "
      emptyMessage="Nenhum resultado encontrado!"
      responsiveLayout="scroll"
    >
      <Column
        field="UsuarioCriacao"
        header="Nome do usuãrio"
        style={{ textAlign: 'left' }}
        sortable
      />
      <Column field="Situacao" header="Situação" style={{ textAlign: 'left' }} sortable />
      <Column field="DataCriacao" header="Data/Hora" style={{ textAlign: 'left' }} sortable />
      <Column
        field="CodigoProcessoSei"
        header="Processo SEI"
        style={{ textAlign: 'center' }}
        sortable
      />
      <Column
        field="DescricaoJustificativa"
        header="Justificativa"
        style={{ textAlign: 'left' }}
        sortable
      />
    </DataTable>
  );
};
export default GridAlteracaoSituacao;
