import React from 'react';
import { Dialog } from 'primereact/dialog';
import DialogDeclaracaoFilter from '../models/DialogDeclaracaoFilter';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Container from '../../../provider/components/Container';
import AnttDropdown from '../../../provider/components/Dropdown';
import AnttCalendar from '../../../provider/components/Calendar';
import AnttCpf from '../../../provider/components/Cpf';

interface Props {
  filter: DialogDeclaracaoFilter;
}

const dialogFooter = (filter: DialogDeclaracaoFilter) => {
  return (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        type={'button'}
        className="p-button-text"
        onClick={() => filter.setIsVisible(false)}
      />
    </>
  );
};

const DialogDeclaracaoDetelhe: React.FC<Props> = ({ filter }) => {
  return (
    <Dialog
      className="custom-dialog"
      visible={filter.isVisible}
      header={filter.tituloDialog}
      modal
      onHide={() => filter.setIsVisible(false)}
      footer={dialogFooter(filter)}
      style={{ minWidth: '60%', minHeight: '95%' }}
    >
      <div className={'grid pt-4'}>
        <div className=" col-12 md:col-6">
          <h4 className={'pb-4'}>Dados da declaração</h4>
          {!filter.idInstalacaoDeclaracao && (
            <Container col={12}>
              <label htmlFor="empresa">Empresa:</label>
              <AnttDropdown
                id="empresa"
                optionLabel="name"
                filter
                showClear
                filterBy="name"
                disabled={true}
                value={filter.CNPJEmpresa}
                options={filter.listaEmpresHabilitadas}
              />
            </Container>
          )}
          <Container col={12}>
            <label htmlFor="tipodeclaracao">Tipo de Declaração:</label>
            <AnttDropdown
              id="tipocontato"
              disabled={true}
              value={filter.idTipoDeclaracao}
              options={filter.listTipoDeclaracao}
            />
          </Container>
          <Container col={12}>
            <label htmlFor="dataEmissao">Data de Emissão: </label>
            <AnttCalendar id="dataEmissao" disabled={true} value={filter.dataEmissao} showIcon />
          </Container>
          <Container col={12}>
            <label htmlFor="dataEmissao">Data de validade:</label>
            <AnttCalendar id="dataValidade" disabled={true} value={filter.dataValidade} showIcon />
          </Container>
          <Container col={12}>
            <label htmlFor="documento">Documento da Declaração:</label>
            {filter.idArquivo && (
              <Button
                icon="pi pi-download"
                type="button"
                label={filter.nomeArquivo}
                className="p-button-rounded p-button-rounded-info mr-2"
                // onClick={() => controller.getArquivoDownload(filter.idArquivo)}
                tooltip="Download"
                tooltipOptions={{ position: 'top' }}
              />
            )}
          </Container>
        </div>
        <div className=" col-12 md:col-6">
          <h4 className={'pb-4'}>Emissor da declaração</h4>
          <Container col={12}>
            <label htmlFor="CPF">CPF:</label>
            <AnttCpf
              disabled={true}
              maxLength={11}
              id="CPF"
              campo={filter.cpfNumero}
              setCampo={filter.setCpfNumero}
              placeholder="CPF"
            />
          </Container>
          <Container col={12}>
            <label htmlFor="nome">Nome:</label>
            <InputText
              disabled={true}
              maxLength={200}
              id="nome"
              value={filter.nome}
              placeholder="Nome"
            />
          </Container>
          <Container col={12}>
            <label htmlFor="CPF">Nº de Registro:</label>
            <InputText
              disabled={true}
              id="nRegistro"
              value={filter.codigoRegistro}
              placeholder="Nº de Registro"
            />
          </Container>

          <Container col={12}>
            <label htmlFor="telefone">Telefone:</label>
            <InputText
              disabled={true}
              id="telefone"
              maxLength={15}
              value={filter.telefone}
              placeholder="Contato"
            />
          </Container>
          <Container col={12}>
            <label htmlFor="email ">E-mail:</label>
            <InputText
              disabled={true}
              id="email"
              value={filter.email}
              onChange={(e) => filter.setEmail(e.target.value)}
              placeholder="E-mail"
            />
          </Container>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogDeclaracaoDetelhe;
