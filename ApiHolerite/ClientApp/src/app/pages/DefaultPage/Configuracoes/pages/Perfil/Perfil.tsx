import { InputText } from 'primereact/inputtext';
import React, { useEffect, useRef, useState } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { User } from '../../../../../../provider/redux/@types/auth';
import AuthService from '../../../../../../provider/services/authService';
import { DataTable } from 'primereact/datatable';
import { InputSwitch } from 'primereact/inputswitch';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import PerfilController from '../../controllers/Perfil/PerfilController';
import { PerfilModel } from '../../../../../@types/model/PerfilModel';

const Perfil: React.FC = () => {
  const auth = new AuthService();
  const controller = new PerfilController();
  const [loading, setLoading] = useState(false);
  const [modalDialog, setModalDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deleteTemplateDialog, setDeleteTemplateDialog] = useState(false);
  const [perfilModel, setPerfilModel] = useState<PerfilModel>();
  const [userModel, setUserModel] = useState<User>();
  const [deleteDialog, setDeleteDialog] = useState(false);

  const dt = useRef(null);

  useEffect(() => {
    controller.init();
    let teste = controller.obterUsuario();
    let object = Object.prototype.constructor(teste);
    setUserModel(object);
    console.log('userModel jalles');
    console.log(userModel);
    console.log(auth.isAuthenticated());
  }, []);

  // const onPesquisar = async () => {
  //   setLoading(true);
  //   if (!rowCep?.length) {
  //     setLoading(false);
  //     return ToastService.showWarn('Deve informar o cep valido');
  //   }
  //   await setTimeout(async () => {
  //     let result = await controller.ObterCep(rowCep);
  //     let object = Object.prototype.constructor(result);
  //     setCepModel(object);
  //     setLoading(false);
  //   }, 2000);
  // };

  const onSalvarPerfil = async () => {
    debugger;
    setLoading(true);
    // setUserModel(controller?.selecionarPessoa);
    setPerfilModel({ ...perfilModel });
    if (!perfilModel?.id) {
      await controller.onInsertPerfil(perfilModel);
    } else {
      await controller.onUpdatePerfil(perfilModel);
    }

    setLoading(false);
  };

  const onchangeFilter = () => {};

  const openNew = () => {
    setModalDialog(true);
  };

  const onHideNewModelDialog = () => {
    setSubmitted(false);
    setModalDialog(false);
  };

  const onHideDeleteModalDialog = () => {
    setDeleteTemplateDialog(false);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Novo"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          style={{ marginRight: '.5em' }}
          onClick={openNew}
        />
        {/* <Button label="Excluir" icon="pi pi-trash" className="p-button-danger" style={{ marginRight: '.5em' }} onClick={confirmDeleteSelected} disabled={!controller.selectedLancamentos || !controller.listaTipoLancamento.length} /> */}
        <span style={{ marginRight: '.5em' }}>Data Inicio</span>
        <Button
          label="Pesquisar"
          icon="pi pi"
          className="p-button"
          style={{ marginRight: '.5em' }}
          onClick={onchangeFilter}
        />
      </React.Fragment>
    );
  };

  const editarTemplate = async (perfil?: PerfilModel) => {
    setTimeout(async () => {
      setPerfilModel(perfil);
      // controller.onSelecionarChenge(modal?.modulo);
    }, 2000);
    // controller.onTipoBancosChange(lancamento.bancos);
    // controller.onTipoLancamentoChange(lancamento.tipoLancamento);
    setModalDialog(true);
  };

  const confirmDeleteTemplate = (perfil: PerfilModel) => {
    setPerfilModel(perfil);
    setDeleteTemplateDialog(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const deleteSelected = async () => {
    setDeleteDialog(false);
    // toast.current.show({
    //   severity: 'success',
    //   summary: 'Sucesso',
    //   detail: 'Lançamentos excluidos com sucesso',
    //   life: 3000,
    // });
    await controller.onDeletePerfil(perfilModel);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          style={{ marginRight: '.5em' }}
          onClick={async () => editarTemplate(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          style={{ marginRight: '.5em' }}
          onClick={() => confirmDeleteTemplate(rowData)}
        />
      </div>
    );
  };

  const nomePerfilTemplate = (rowData: any) => {
    return <>{rowData.nomePerfil}</>;
  };

  const statusTemplate = (rowData: any) => {
    return (
      <>
        <InputSwitch checked={rowData.status} />
        {rowData.status}
      </>
    );
  };

  const modalDialogFooter = (
    <>
      <Button
        loading={loading}
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={onHideNewModelDialog}
      />
      <Button
        loading={loading}
        label="Gravar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={onSalvarPerfil}
      />
    </>
  );

  const deleteDialogFooter = (
    <>
      <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteDialog} />
      <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteSelected} />
    </>
  );

  return (
    <div className="card">
      <div className="col-12">
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={controller.listaPerfilModel}
            selection={controller.selected}
            onSelectionChange={(e) => controller.setSelected(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords} Perfil"
            emptyMessage="Nenhum Perfil encontrado."
          >
            {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
            <Column header="Perfil" sortable body={nomePerfilTemplate}></Column>
            <Column header="Status" sortable body={statusTemplate}></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>

          <Dialog
            visible={modalDialog}
            header="Perfil"
            modal
            className="p-fluid"
            footer={modalDialogFooter}
            onHide={onHideNewModelDialog}
          >
            <div className="col-12 md:col-12">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-compass"></i>
                </span>
                <InputText
                  placeholder="Descrição do Perfil"
                  value={perfilModel?.nomePerfil}
                  onChange={(e) => {
                    setPerfilModel({ ...perfilModel, nomePerfil: e.target.value });
                  }}
                />
                {submitted && !perfilModel?.nomePerfil && (
                  <small className="p-invalid">Descrição é obrigatório.</small>
                )}
              </div>
            </div>

            <div className="col-12 md:col-12">
              <div className="p-inputgroup">
                <InputSwitch
                  name={perfilModel?.ativo ? 'Ativo:' : 'Inativo:'}
                  trueValue={true}
                  falseValue={false}
                  checked={perfilModel?.ativo}
                  onChange={(e) => {
                    setPerfilModel({ ...perfilModel, ativo: e.target.value });
                  }}
                />
                {submitted && !perfilModel?.ativo && (
                  <small className="p-invalid">Status é obrigatório.</small>
                )}
              </div>
            </div>

            {/* <div className="col-12">
              <div className="p-inputgroup">
                {/* <span className="p-inputgroup-addon">
                  <i className="pi pi-compass"></i>
                </span>
                <PropDropdown
                  optionLabel="nome"
                  showClear={false}
                  emptyMessage="Nenhum registro"
                  emptyFilterMessage="Nenhum registro"
                  placeholder="Selecionar"
                  options={controller.listaPessoasModel}
                  value={controller?.selecionarPessoa}
                  onChange={(e) => {
                    controller.onSelecionarChenge(e.target.value);
                  }}
                />
                {/* {submitted && !grupoModel?.Status && (
                  <small className="p-invalid">Status é obrigatório.</small>
                )} 
              </div>
            </div> */}
          </Dialog>

          <Dialog
            visible={deleteDialog}
            style={{ width: '450px' }}
            header="Confirma"
            modal
            footer={modalDialogFooter}
            onHide={onHideDeleteModalDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {perfilModel && (
                <span>
                  Tem certeza que deseja excluir o lançamento <b>{perfilModel?.nomePerfil}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteTemplateDialog}
            style={{ width: '450px' }}
            header="Confirma"
            modal
            footer={deleteDialogFooter}
            onHide={hideDeleteDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {perfilModel && (
                <span>
                  Tem certeza que deseja excluir o lançamento <b>{perfilModel?.nomePerfil}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default Perfil;
