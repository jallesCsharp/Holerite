import React, { useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import InstalacaoEmpresaController from '../controllers/InstalacaoEmpresaController';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import InstalacaoEmpresaFilter from '../models/InstalacaoEmpresaFilter';
import HeaderInstalacaoEmpresa from '../component/HeaderInstalacaoEmpresa';

export const InstalacaoEmpresa = () => {
  const filter = new InstalacaoEmpresaFilter();
  const controller = new InstalacaoEmpresaController(filter);

  useEffect(() => {
    controller.init();
  }, []);

  const dt = useRef(null);

  const footerGrid = () => {
    return (
      <div className="flex justify-content-end flex-wrap card-container  export-buttons">
        <Button
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
          onClick={() => controller.exportPdf(filter.grid, 'Relatorio_instalacaes_empresa', 'a4')}
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
          onClick={() => controller.exportExcel(filter.grid, 'Relatorio_instalacaes_empresa')}
        />
      </div>
    );
  };
  return (
    <>
      <HeaderInstalacaoEmpresa filter={filter} controller={controller} />
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
          <Column field="Empresa" header="Empresa" style={{ textAlign: 'left' }} sortable />
          <Column
            field="NomeInstalacao"
            header="Nome da Instalação"
            style={{ textAlign: 'left' }}
            sortable
          />
          <Column field="NomeUF" header="UF" style={{ textAlign: 'left' }} sortable />
          <Column field="NomeMunicipio" header="Município" style={{ textAlign: 'left' }} sortable />
          <Column
            field="SituacaoInstalacao"
            header="Situação da Instalação"
            style={{ textAlign: 'left' }}
            sortable
          />
          <Column
            field="SituacaoEmpresa"
            header="Situação da Empresa"
            style={{ textAlign: 'left' }}
            sortable
          />
        </DataTable>
      </Card>
    </>
  );
};
