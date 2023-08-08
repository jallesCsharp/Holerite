import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Props {
  filter: null;
  action: any;
}

const GridContato: React.FC<Props> = ({ filter, action }) => {
  return (
    <DataTable
      dataKey="idContato"
      // value={filter.gridContato}
      paginator
      rows={10}
      rowsPerPageOptions={[10, 20, 30]}
      className="datatable-responsive"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} contatos"
      emptyMessage="Nenhum resultado encontrado!"
      responsiveLayout="scroll"
    >
      <Column
        field="TipoContato.NomeTipoContato"
        header="Tipo de Contato"
        style={{ textAlign: 'left' }}
        sortable
      />
      <Column field="DescricaoContato" header="Contato" style={{ textAlign: 'left' }} sortable />
      <Column
        field="acao"
        header="Ações"
        body={action}
        style={{ textAlign: 'center', width: 'auto', whiteSpace: 'nowrap' }}
      />
    </DataTable>
  );
};
export default GridContato;
