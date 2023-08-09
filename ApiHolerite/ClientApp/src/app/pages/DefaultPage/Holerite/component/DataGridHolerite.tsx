import React, { useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

interface Props {
  filter: any;
  controller: any;
}

const DataGridHolerite: React.FC<Props> = ({ filter, controller }) => {
  useEffect(() => {
    controller.init();
  }, []);

  const dt = useRef(null);

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
          value={filter.grid}
          paginator
          rows={10}
          rowsPerPageOptions={[10, 20, 30]}
          className="datatable-responsive"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords}"
          emptyMessage="Nenhum resultado encontrado!"
          responsiveLayout="scroll"
        >
          <Column field="NomeInstalacao" header="Nome" style={{ textAlign: 'left' }} sortable />
          <Column
            field="UFInstalacao"
            header="UF da Instalação"
            style={{ textAlign: 'left' }}
            sortable
          />

          <Column field="Usuario" header="Usuário" style={{ textAlign: 'left' }} sortable />
          <Column
            field="PerfilUsuario"
            header="Perfil Usuário"
            style={{ textAlign: 'left' }}
            sortable
          />
          <Column field="Campo" header="Campo" style={{ textAlign: 'left' }} sortable />
          <Column
            field="ValorAntigo"
            header="Valor Antigo"
            style={{ textAlign: 'left' }}
            sortable
          />
          <Column field="ValorAtual" header="Valor Atual" style={{ textAlign: 'left' }} sortable />
        </DataTable>
      </Card>
    </>
  );
};

export default DataGridHolerite;
