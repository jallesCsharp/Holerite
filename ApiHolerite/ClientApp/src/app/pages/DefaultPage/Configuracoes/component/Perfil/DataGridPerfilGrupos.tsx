import React, { Fragment, useState } from 'react';
import { Card } from 'primereact/card';
import PerfilGruposFilter from '../../models/Perfil/PerfilGruposFilter';
import PerfilGruposController from '../../controllers/Perfil/PerfilGruposController';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ToastService from '../../../../../../provider/services/toastService';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import ProDropdown from '../../../../../../provider/components/Dropdown';
import { InputText } from 'primereact/inputtext';

interface Props {
  filter: PerfilGruposFilter;
  controller: PerfilGruposController;
}

const DataGridPerfilGrupos: React.FC<Props> = ({ filter, controller }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const calculateCustomerTotal = (name: any) => {
    let total = 0;

    if (filter.listaControleAcessos) {
      for (let customer of filter.listaControleAcessos) {
        if (customer.perfil.nomePerfil === name) {
          total++;
        }
      }
    }

    return total;
  };

  const headerTemplate = (data: any) => {
    console.log('headerTemplate');
    console.log(data);
    return (
      <React.Fragment>
        <span className="image-text">{data.perfil.nomePerfil}</span>
      </React.Fragment>
    );
  };

  const footerTemplate = (data: any) => {
    return (
      <React.Fragment>
        <td colSpan={2} style={{ textAlign: 'center' }}>
          Total {data.perfil.nomePerfil.toLowerCase()}
        </td>
        <td>{calculateCustomerTotal(data.perfil.nomePerfil)}</td>
      </React.Fragment>
    );
  };

  const onRowGroupExpand = (event: any) => {
    ToastService.showWarn(event.data.perfil.nomePerfil);
  };

  const onRowGroupCollapse = (event: any) => {
    ToastService.showSuccess(event.data.perfil.nomePerfil);
  };

  const modalDialogFooter = (
    <>
      <Button
        loading={filter.loading}
        label="Cancelar"
        icon="pi pi-times"
        className="p-button p-button-danger"
        onClick={controller.onDialogCancelarPerfilGrupos}
      />
      <Button
        loading={filter.loading}
        label="Gravar"
        icon="pi pi-check"
        className="p-button p-button-success"
        onClick={controller.onSalvarPerfilGrupos}
      />
    </>
  );

  const modalDialogPerfilFooter = (
    <>
      <Button
        loading={filter.loading}
        label="Cancelar"
        icon="pi pi-times"
        className="p-button p-button-danger"
        onClick={controller.fecharCadastrarPerfilModal}
      />
      <Button
        loading={filter.loading}
        label="Gravar"
        icon="pi pi-check"
        className="p-button p-button-success"
        onClick={controller.onSalvarPerfilGrupos}
      />
    </>
  );

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Novo"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          style={{ marginRight: '.5em' }}
          onClick={controller.openNew}
        />
      </React.Fragment>
    );
  };

  return (
    <>
      <div className="datatable-rowgroup">
        <Card>
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable
            value={filter.listaControleAcessos}
            rowGroupMode="subheader"
            groupRowsBy="perfil.nomePerfil"
            expandableRowGroups
            expandedRows={expandedRows}
            onRowToggle={(e: any) => setExpandedRows(e.data)}
            onRowExpand={onRowGroupExpand}
            onRowCollapse={onRowGroupCollapse}
            sortMode="single"
            sortOrder={1}
            scrollable
            paginator
            rows={20}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} Funcionalidades"
            rowGroupHeaderTemplate={headerTemplate}
            rowGroupFooterTemplate={footerTemplate}
            responsiveLayout="stack"
          >
            <Column
              field="funcionalidades.menu"
              header="Menu"
              style={{ minWidth: '200px' }}
            ></Column>
            <Column
              field="funcionalidades.modulo"
              header="Modulo"
              style={{ minWidth: '200px' }}
              className="text-red-50"
            ></Column>
          </DataTable>
        </Card>

        <Dialog
          visible={filter.perfilGruposModalDialog}
          modal
          header="Cadastrar Controle de Acesso"
          maximizable={true}
          style={{ width: '95%', height: '95%', whiteSpace: 'nowrap' }}
          footer={modalDialogFooter}
          onHide={controller.onDialogCancelar}
        >
          <div className="card">
            <div className="grid p-fluid">
              <div className="col-12 md:col-6">
                <label htmlFor="perfil">Perfil:</label>
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <Button
                      disabled={false}
                      className="p-button-sucess"
                      icon="pi pi-plus-circle"
                      loading={filter.loading}
                      onClick={() => controller.CadastrarPerfilGrupos()}
                    />
                  </span>
                  <ProDropdown
                    optionLabel={'nomePerfil'}
                    optionValue={'nomePerfil'}
                    showClear={false}
                    filter={false}
                    options={filter.listaPerfilGrupos}
                    value={filter.perfilGrupoSelecionado?.nomePerfil || undefined}
                    onChange={(e: any) => controller.onSelecionarPerfilGrupo(e.target.value)}
                  />
                  {filter.submitted && !filter.perfilGrupoSelecionado?.nomePerfil && (
                    <small className="p-invalid">Nome é obrigatório.</small>
                  )}
                </div>
              </div>
              <div className="col-12 md:col-6">
                <label htmlFor="funcionalidades">Funcionalidades:</label>
                <div className="p-inputgroup">
                  <ProDropdown
                    optionLabel={'modulo'}
                    optionValue={'modulo'}
                    showClear={false}
                    filter={false}
                    emptyMessage={
                      filter.listaFuncionalidades?.length === 0
                        ? 'Nenhum registro'
                        : 'Selecionar o Perfil'
                    }
                    options={filter.listaFuncionalidades}
                    value={filter.funcionalidadesSelecionado?.modulo || undefined}
                    onChange={(e: any) => controller.onSelecionarFuncionalidades(e.target.value)}
                  />
                  {filter.submitted && !filter.funcionalidadesSelecionado?.modulo && (
                    <small className="p-invalid">Nome é obrigatório.</small>
                  )}
                </div>
              </div>
              <div className="col-12 md:col-2">
                <div className="p-inputgroup">
                  <Button
                    loading={filter.loading}
                    label="Adicionar"
                    icon="pi pi-plus-circle"
                    className="p-button p-button"
                    onClick={controller.adicionarListadeCadastro}
                  />
                </div>
              </div>

              <div className="col-12 md:col-10"></div>

              <div className="col-12 md:col-12">
                <div className="p-inputgroup">
                  <DataTable
                    value={filter.addControleAcessos}
                    emptyMessage="Nenhum resultado encontrado!"
                    sortOrder={1}
                    responsiveLayout="stack"
                  >
                    <Column
                      field="perfil.nomePerfil"
                      header="Menu"
                      style={{ minWidth: '200px' }}
                    ></Column>
                    <Column
                      field="funcionalidades.menu"
                      header="Menu"
                      style={{ minWidth: '200px' }}
                    ></Column>
                    <Column
                      field="funcionalidades.modulo"
                      header="Modulo"
                      style={{ minWidth: '200px' }}
                      className="text-red-50"
                    ></Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog
          visible={filter.cadastrarPerfilModalDialog}
          modal
          header="Cadastrar Perfil"
          maximizable={true}
          maximized={true}
          style={{ width: '100%', height: '100%', whiteSpace: 'nowrap' }}
          footer={modalDialogPerfilFooter}
          onHide={controller.fecharCadastrarPerfilModal}
        >
          <div className="card">
            <div className="grid p-fluid">
              <div className="col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-shield"></i>
                  </span>
                  <InputText
                    placeholder="Nome"
                    value={filter.perfilGrupoSelecionado?.nomePerfil}
                    onChange={(e) => {
                      filter.setPerfilGrupoSelecionado({
                        ...filter.perfilGrupoSelecionado,
                        nomePerfil: e.target.value,
                      });
                    }}
                  />
                  {filter.submitted && !filter.perfilGrupoSelecionado?.nomePerfil && (
                    <small className="p-invalid">Nome é obrigatório.</small>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default DataGridPerfilGrupos;
