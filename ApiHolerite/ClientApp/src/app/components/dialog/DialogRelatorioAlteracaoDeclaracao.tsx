import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Utils } from '../../shared/utils/Utils';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';

interface Props {
  title: string;
  grid: any[];
  action: any;
  visible: boolean;
  controller: any;
}

const dialogFooter = (action: any) => {
  return (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        type={'button'}
        className="p-button-text"
        onClick={action}
      />
    </>
  );
};

const header = (globalFilterValue: any, onGlobalFilterChange: any) => {
  return (
    <>
      <div>
        <div className="m-0 p-0 col-12 md:col-12 grid">
          <div className="flex  m-0 p-0">
            <div>Pesquisa:</div>
            <span className="m-0 p-0 ml-3 p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                placeholder="Pesquisa"
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const DialogRelatorioAlteracaoDeclaracao: React.FC<Props> = ({
  title,
  grid,
  action,
  visible,
  controller,
}) => {
  const [filtersBusca, setFiltersBusca] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    const filtersTemp = { ...filtersBusca };
    filtersTemp.global.value = value;
    setFiltersBusca(filtersTemp);
    setGlobalFilterValue(value);
  };

  return (
    <>
      <Dialog
        header={title}
        visible={visible}
        modal
        onHide={action}
        footer={dialogFooter(action)}
        style={{ minWidth: '600px', minHeight: '300px' }}
      >
        <>
          <DataTable
            dataKey="griddeclaracao"
            filters={filtersBusca}
            header={header(globalFilterValue, onGlobalFilterChange)}
            value={grid}
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
              field="UsuarioCriacao"
              header="Usuário"
              style={{ textAlign: 'left' }}
              sortable
            />
            <Column
              field="DescricaoJustificativaAprovacao"
              header="Justificativa"
              style={{ textAlign: 'left' }}
              sortable
            />
          </DataTable>
        </>
      </Dialog>
    </>
  );
};
export default DialogRelatorioAlteracaoDeclaracao;
