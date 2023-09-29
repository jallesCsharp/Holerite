import React, { useRef } from 'react';
import PerfilController from '../controllers/PerfilController';
import PerfilFilter from '../models/PerfilFilter';
import { classNames } from 'primereact/utils';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dialog } from 'primereact/dialog';

interface Props {
  filter: PerfilFilter;
  controller: PerfilController;
}

const TabViewPerfilHolerite: React.FC<Props> = ({ filter, controller }) => {
  const dt = useRef(null);

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

  const verifiedFilterTemplate = (options: { value: any; filterCallback: (arg0: any) => any }) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e: any) => options.filterCallback(e.value)}
      />
    );
  };

  const modalDialogFooter = (
    <>
      <Button
        type="button"
        label="Fechar"
        icon="pi pi-check"
        className="p-button-danger mr-2"
        onClick={controller.modalVisualizarHoleriteOnFechar}
      />
    </>
  );

  const visualizarHolerite = (rowData: any) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info mr-2"
          style={{ marginRight: '.8em' }}
          onClick={() => controller.visulizarHolerite(rowData)}
        />
      </div>
    );
  };

  const reenviarEmail = (rowData: any) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-send"
          className="p-button-rounded p-button-info mr-2"
          style={{ marginRight: '.8em' }}
          onClick={() => controller.reenviarEmail(rowData)}
        />
      </div>
    );
  };

  return (
    <>
      <TabView className="tabview-custom">
        <TabPanel header="Holerite" leftIcon="pi pi-id-card mr-2">
          <>
            <Card>
              <DataTable
                ref={dt}
                dataKey="id"
                value={filter.listaArquivos?.filter((pX) => pX.emailEnviado === true)}
                responsiveLayout="stack"
                currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords}"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 20, 30, 50]}
                rows={10}
                paginator
                sortOrder={-1}
                emptyMessage="Nenhum resultado encontrado!"
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
                <Column
                  field="mesExtenso"
                  header="Mês"
                  align={'center'}
                  style={{ textAlign: 'center' }}
                />
                <Column
                  header="Holerite"
                  align={'center'}
                  style={{ width: '15%', height: '10%', textAlign: 'center' }}
                  body={visualizarHolerite}
                ></Column>
                <Column
                  field="emailEnviado"
                  header="E-mail Enviado"
                  dataType="boolean"
                  bodyClassName="p-text-center"
                  align={'center'}
                  style={{ minWidth: '.8em' }}
                  body={verifiedBodyTemplate}
                  filterElement={verifiedFilterTemplate}
                />
                <Column
                  header="Reenviar E-mail"
                  align={'center'}
                  style={{ width: '15%', height: '10%', textAlign: 'center' }}
                  body={reenviarEmail}
                />
              </DataTable>
            </Card>

            <Dialog
              visible={filter.onVisualizarHolerite}
              modal
              header="Holerite"
              maximizable={true}
              style={{ width: '40%', height: '95%', whiteSpace: 'nowrap' }}
              footer={modalDialogFooter}
              onHide={controller.modalVisualizarHoleriteOnFechar}
            >
              <div className="card">
                <div className="grid p-fluid">
                  <div className="col-12 md:col-12">
                    <object
                      width="100%"
                      height="800px"
                      type="application/pdf"
                      data={'data:application/pdf;base64,' + `${filter.arquivosModel?.arquivo}`}
                    ></object>
                  </div>
                </div>
              </div>
            </Dialog>
          </>
        </TabPanel>
        {/* <TabPanel header="Header II" rightIcon="pi pi-user">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel header="Header III" leftIcon="pi pi-search" rightIcon="pi pi-cog">
          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
            occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt
            mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque
            nihil impedit quo minus.
          </p>
        </TabPanel> */}
      </TabView>
    </>
  );
};

export default TabViewPerfilHolerite;
