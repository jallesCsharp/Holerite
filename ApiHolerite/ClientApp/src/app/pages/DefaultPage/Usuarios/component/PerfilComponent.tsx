import React from 'react';
import PropDropdown from '../../../../../provider/components/Dropdown';
import { InputText } from 'primereact/inputtext';
import PerfilController from '../controllers/PerfilController';
import PerfilFilter from '../models/PerfilFilter';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface Props {
  filter: PerfilFilter;
  controller: PerfilController;
}

const PerfilComponent: React.FC<Props> = ({ filter, controller }) => {
  const modalEmpresaDialogFooter = (
    <>
      <Button
        loading={filter.loading}
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={controller.onDialogCancelarEmpresa}
      />
      <Button
        loading={filter.loading}
        label="Gravar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={controller.onSalvarEmpresa}
      />
    </>
  );

  const modalProfissaoDialogFooter = (
    <>
      <Button
        loading={filter.loading}
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={controller.onDialogCancelarProfissao}
      />
      <Button
        loading={filter.loading}
        label="Gravar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={controller.onSalvarProfissao}
      />
    </>
  );

  return (
    <>
      <div className="card">
        <div className="grid p-fluid">
          <div className="col-12 md:col-6">
            <label htmlFor="nome">Nome:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                disabled={!filter.editarPerfil}
                placeholder="Nome"
                value={filter.pessoa?.nome || undefined}
                onChange={async (e) => {
                  await filter.setPessoa({
                    ...filter.pessoa,
                    nome: e.target.value,
                  });
                }}
              />
              {filter.submitted && !filter.pessoa?.nome && (
                <small className="p-invalid">Nome é obrigatório.</small>
              )}
            </div>
          </div>

          <div className="col-12 md:col-6">
            <label htmlFor="email">E-Mail:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-at"></i>
              </span>
              <InputText
                disabled={!filter.editarPerfil}
                placeholder="E-Mail"
                value={filter.pessoa?.email || undefined}
                onChange={(e) => {
                  filter.setPessoa({
                    ...filter.pessoa,
                    email: e.target.value,
                  });
                }}
              />
              {filter.submitted && !filter.pessoa?.email && (
                <small className="p-invalid">E-Mail é obrigatório.</small>
              )}
            </div>
          </div>

          <div className="col-12 md:col-4">
            <label htmlFor="cpf">CPF:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-id-card"></i>
              </span>
              <InputText
                disabled={!filter.editarPerfil}
                placeholder="CPF"
                value={filter.pessoa?.cpf || undefined}
                onChange={(e) => {
                  filter.setPessoa({
                    ...filter.pessoa,
                    cpf: e.target.value,
                  });
                }}
              />
              {filter.submitted && !filter.pessoa?.cpf && (
                <small className="p-invalid">CPF é obrigatório.</small>
              )}
            </div>
          </div>

          <div className="col-12 md:col-4">
            <label htmlFor="pis">PIS:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-id-card"></i>
              </span>
              <InputText
                disabled={!filter.editarPerfil}
                placeholder="PIS"
                value={filter.pessoa?.pis || undefined}
                onChange={(e) => {
                  filter.setPessoa({
                    ...filter.pessoa,
                    pis: e.target.value,
                  });
                }}
              />
              {filter.submitted && !filter.pessoa?.pis && (
                <small className="p-invalid">PIS é obrigatório.</small>
              )}
            </div>
          </div>

          <div className="col-12 md:col-4">
            <label htmlFor="codigoFolha">Código Folha:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-id-card"></i>
              </span>
              <InputText
                disabled={!filter.editarPerfil}
                placeholder="Código Folha"
                value={filter.pessoa?.codigoFolha || undefined}
                onChange={(e) => {
                  filter.setPessoa({
                    ...filter.pessoa,
                    codigoFolha: e.target.value,
                  });
                }}
              />
              {filter.submitted && !filter.pessoa?.codigoFolha && (
                <small className="p-invalid">Código de Folha Holerite é obrigatório.</small>
              )}
            </div>
          </div>

          <div className="col-12 md:col-6">
            <label htmlFor="empresa">Empresa:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <Button
                  disabled={!filter.editarPerfil}
                  className="p-button-sucess"
                  icon="pi pi-plus-circle"
                  onClick={() => controller.CadastrarEmpresa()}
                />
              </span>
              <PropDropdown
                disabled={!filter.editarPerfil}
                optionLabel={'nomeEmpresa'}
                optionValue={'nomeEmpresa'}
                showClear={false}
                filter={false}
                options={filter.listaEmpresas}
                value={filter.pessoa?.empresas.nomeEmpresa}
                onChange={(e: any) => controller.onSelecionarEmpresa(e.target.value)}
              />
              {filter.submitted && !filter.empresaSelecionado?.nomeEmpresa && (
                <small className="p-invalid">Empresa é obrigatório.</small>
              )}
            </div>
          </div>

          <Dialog
            visible={filter.modalEmpresaDialog}
            modal
            header="Cadastrar nova Empresa"
            maximizable={true}
            style={{ width: '40%', height: '95%', whiteSpace: 'nowrap' }}
            footer={modalEmpresaDialogFooter}
            onHide={controller.onDialogCancelarEmpresa}
          >
            <div className="card">
              <div className="grid p-fluid">
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-building"></i>
                    </span>
                    <InputText
                      placeholder="Nome"
                      value={filter.empresa?.nomeEmpresa || undefined}
                      onChange={(e) => {
                        filter.setEmpresa({
                          ...filter.empresa,
                          nomeEmpresa: e.target.value,
                        });
                      }}
                    />
                    {filter.submitted && !filter.empresa?.nomeEmpresa && (
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
                      value={filter.empresa?.email || undefined}
                      onChange={(e) => {
                        filter.setEmpresa({
                          ...filter.empresa,
                          email: e.target.value,
                        });
                      }}
                    />
                    {filter.submitted && !filter.empresa?.email && (
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
                      placeholder="CPNJ"
                      value={filter.empresa?.cnpj || undefined}
                      onChange={(e) => {
                        filter.setEmpresa({
                          ...filter.empresa,
                          cnpj: e.target.value,
                        });
                      }}
                    />
                    {filter.submitted && !filter.empresa?.cnpj && (
                      <small className="p-invalid">CNPJ é obrigatório.</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Dialog>

          <div className="col-12 md:col-6">
            <label htmlFor="profissao">Função:</label>
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <Button
                  disabled={!filter.editarPerfil}
                  className="p-button-sucess"
                  icon="pi pi-plus-circle"
                  loading={filter.loading}
                  onClick={() => controller.CadastrarProfissao()}
                />
              </span>
              <PropDropdown
                disabled={!filter.editarPerfil}
                optionLabel={'nomeProfissao'}
                optionValue={'nomeProfissao'}
                showClear={false}
                filter={false}
                options={filter.listaProfissoes}
                value={filter.pessoa?.profissoes?.nomeProfissao || undefined}
                onChange={(e: any) => controller.onSelecionarProfissao(e.target.value)}
              />
              {filter.submitted && !filter.empresaSelecionado?.nomeEmpresa && (
                <small className="p-invalid">Empresa é obrigatório.</small>
              )}
            </div>
          </div>

          <Dialog
            visible={filter.modalProfissaoDialog}
            modal
            header="Cadastrar nova Função"
            maximizable={true}
            style={{ width: '40%', height: '95%', whiteSpace: 'nowrap' }}
            footer={modalProfissaoDialogFooter}
            onHide={controller.onDialogCancelarProfissao}
          >
            <div className="card">
              <div className="grid p-fluid">
                <div className="col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-briefcase"></i>
                    </span>
                    <InputText
                      placeholder="Nome Função"
                      value={filter.profissoes?.nomeProfissao || undefined}
                      onChange={(e) => {
                        filter.setProfissoes({
                          ...filter.profissoes,
                          nomeProfissao: e.target.value,
                        });
                      }}
                    />
                    {filter.submitted && !filter.profissoes?.nomeProfissao && (
                      <small className="p-invalid">Nome é obrigatório.</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
      <div className="flex justify-content-end flex-wrap card-container  export-buttons">
        <Button
          disabled={!filter.editarPerfil}
          type="button"
          icon="pi pi-file"
          className="mr-2"
          data-pr-tooltip="Editar"
          label={'Cancelar'}
          onClick={() => controller.onCancelarEdicao(filter.pessoa?.id)}
        />
        <Button
          type="button"
          icon="pi pi-file"
          className="mr-2"
          data-pr-tooltip="Editar"
          label={'Editar'}
          onClick={() => controller.onEditarPerfil()}
        />
        <Button
          disabled={!filter.editarPerfil}
          type="button"
          icon="pi pi-file"
          className="mr-2"
          data-pr-tooltip="Salvar"
          label={'Salvar'}
          onClick={() => controller.onSalvarFicha()}
        />
      </div>
      <hr />
    </>
  );
};

export default PerfilComponent;
