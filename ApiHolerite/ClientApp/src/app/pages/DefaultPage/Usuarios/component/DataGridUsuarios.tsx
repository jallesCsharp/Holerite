import React, { Fragment, useRef } from 'react';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import UsuariosFilter from '../models/UsuariosFilter';
import ListaUsuariosController from '../controllers/ListaUsuariosController';
import PropDropdown from '../../../../../provider/components/Dropdown';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';

interface Props {
  filter: UsuariosFilter;
  controller: ListaUsuariosController;
}

const DataGridUsuarios: React.FC<Props> = ({ filter, controller }) => {
  const dt = useRef(null);

  const VisualizarPerfil = (rowData: any) => {
    controller.history.push(`perfil/${rowData.id}`);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info mr-2"
          style={{ marginRight: '.5em' }}
          onClick={() => VisualizarPerfil(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          style={{ marginRight: '.5em' }}
          onClick={() => controller.editarTemplate(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          style={{ marginRight: '.5em' }}
          onClick={() => controller.confirmDeleteTemplate(rowData)}
        />
      </div>
    );
  };

  const modalDialogFooter = (
    <>
      <Button
        loading={filter.loading}
        label="Cancelar"
        icon="pi pi-times"
        className="p-button p-button-danger"
        onClick={controller.onDialogCancelarFicha}
      />
      <Button
        loading={filter.loading}
        label="Gravar"
        icon="pi pi-check"
        className="p-button p-button-success"
        onClick={controller.onSalvarFicha}
      />
    </>
  );

  const deleteDialogFooter = (
    <>
      <Button
        label="Não"
        icon="pi pi-times"
        className="p-button p-button-danger"
        onClick={controller.hideDeleteDialog}
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        className="p-button p-button-success"
        onClick={controller.deleteSelected}
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
        <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
        <DataTable
          ref={dt}
          value={filter.listaPessoas}
          dataKey="id"
          paginator
          rows={20}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} Usuários"
          emptyMessage="Nenhum resultado encontrado!"
          footer={footerGrid}
          responsiveLayout="stack"
        >
          <Column field="nome" header="Nome" align={'center'} style={{ textAlign: 'center' }} />
          <Column field="cpf" header="CPF" align={'center'} style={{ textAlign: 'center' }} />
          <Column field="pis" header="PIS" align={'center'} style={{ textAlign: 'center' }} />
          <Column
            field="codigoFolha"
            header="Código Folha"
            align={'center'}
            style={{ textAlign: 'center' }}
          />
          <Column field="email" header="E-Mail" align={'center'} style={{ textAlign: 'center' }} />
          <Column
            field="empresas.nomeEmpresa"
            header="Empresa"
            align={'center'}
            style={{ textAlign: 'center' }}
          />
          <Column
            header="Ações"
            align={'center'}
            style={{ width: '15%', height: '10%', textAlign: 'center' }}
            body={actionBodyTemplate}
          ></Column>
        </DataTable>
      </Card>

      <Dialog
        visible={filter.editarModalDialog}
        modal
        header="Ficha"
        maximizable={true}
        style={{ width: '40%', height: '95%', whiteSpace: 'nowrap' }}
        footer={modalDialogFooter}
        onHide={controller.onDialogCancelarFicha}
      >
        <div className="card">
          <div className="grid p-fluid">
            <div className="col-12 md:col-12">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder="Nome"
                  value={filter.pessoasSelecionado?.nome}
                  onChange={(e) => {
                    filter.setPessoasSelecionado({
                      ...filter.pessoasSelecionado,
                      nome: e.target.value,
                    });
                  }}
                />
                {filter.submitted && !filter.pessoasSelecionado?.nome && (
                  <small className="p-invalid">Nome é obrigatório.</small>
                )}
              </div>
            </div>

            <div className="col-12 md:col-12">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-at"></i>
                </span>
                <InputText
                  placeholder="E-Mail"
                  value={filter.pessoasSelecionado?.email}
                  onChange={(e) => {
                    filter.setPessoasSelecionado({
                      ...filter.pessoasSelecionado,
                      email: e.target.value,
                    });
                  }}
                />
                {filter.submitted && !filter.pessoasSelecionado?.email && (
                  <small className="p-invalid">E-Mail é obrigatório.</small>
                )}
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-id-card"></i>
                </span>
                <InputText
                  placeholder="CPF"
                  value={filter.pessoasSelecionado?.cpf}
                  onChange={(e) => {
                    filter.setPessoasSelecionado({
                      ...filter.pessoasSelecionado,
                      cpf: e.target.value,
                    });
                  }}
                />
                {filter.submitted && !filter.pessoasSelecionado?.cpf && (
                  <small className="p-invalid">CPF é obrigatório.</small>
                )}
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-id-card"></i>
                </span>
                <InputText
                  placeholder="PIS"
                  value={filter.pessoasSelecionado?.pis}
                  onChange={(e) => {
                    filter.setPessoasSelecionado({
                      ...filter.pessoasSelecionado,
                      pis: e.target.value,
                    });
                  }}
                />
                {filter.submitted && !filter.pessoasSelecionado?.pis && (
                  <small className="p-invalid">PIS é obrigatório.</small>
                )}
              </div>
            </div>

            <div className="col-12 md:col-6">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-id-card"></i>
                </span>
                <InputText
                  placeholder="Código Folha"
                  value={filter.pessoasSelecionado?.codigoFolha}
                  onChange={(e) => {
                    filter.setPessoasSelecionado({
                      ...filter.pessoasSelecionado,
                      codigoFolha: e.target.value,
                    });
                  }}
                />
                {filter.submitted && !filter.pessoasSelecionado?.codigoFolha && (
                  <small className="p-invalid">Código de Folha Holerite é obrigatório.</small>
                )}
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="empresa">Empresa:</label>
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-compass"></i>
                </span>
                <PropDropdown
                  optionLabel={'nomeEmpresa'}
                  optionValue={'nomeEmpresa'}
                  showClear={false}
                  options={filter.listaEmpresas}
                  value={filter.empresaSelecionado?.nomeEmpresa}
                  onChange={(e: any) => controller.onSelecionarEmpresa(e.target.value)}
                />
                {filter.submitted && !filter.empresaSelecionado?.nomeEmpresa && (
                  <small className="p-invalid">Empresa é obrigatório.</small>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={filter.deleteModalDialog}
        modal
        style={{ width: '40%', height: '95%', whiteSpace: 'nowrap' }}
        header="Confirma"
        footer={deleteDialogFooter}
        onHide={controller.hideDeleteDialog}
      >
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          <span>
            Tem certeza que deseja excluir Usuário <b>{}</b>?
          </span>
        </div>
      </Dialog>
    </>
  );
};

export default DataGridUsuarios;
