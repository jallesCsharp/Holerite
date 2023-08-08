import React from 'react';
import { Dialog } from 'primereact/dialog';
import DialogDeclaracaoFilter from '../models/DialogDeclaracaoFilter';
import { classNames } from 'primereact/utils';
import { Mensagem } from '../../shared/mensagem/Mensagem';
import { Validacoes } from '../../shared/validacoes/Validacoes';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Utils } from '../../shared/utils/Utils';
import Container from '../../../provider/components/Container';
import AnttDropdown from '../../../provider/components/Dropdown';
import AnttCalendar from '../../../provider/components/Calendar';
import AnttCpf from '../../../provider/components/Cpf';

interface Props {
  filter: DialogDeclaracaoFilter;
  controller: null;
}

const dialogFooter = (controller: any, filter: DialogDeclaracaoFilter) => {
  return (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        type={'button'}
        className="p-button-text"
        onClick={() => filter.setIsVisible(false)}
      />
      {!filter.disable && (
        <Button
          label={filter.labelBotao}
          icon="pi pi-check"
          type={'submit'}
          form={'formDeclaracao'}
          className="p-button-text"
        />
      )}
    </>
  );
};

// const itemTemplate = (item: any) => {
//   return (
//     <div className="flex align-items-center">
//       <div>{item.name}</div>
//     </div>
//   );
// };

const DialogDeclaracao: React.FC<Props> = ({ filter, controller }) => {
  // @ts-ignore
  return (
    <Dialog
      className="custom-dialog"
      visible={filter.isVisible}
      header={filter.tituloDialog}
      modal
      onHide={() => filter.setIsVisible(false)}
      footer={dialogFooter(controller, filter)}
      style={{ minWidth: '60%', minHeight: '95%' }}
    >
      <form
        name={'formDeclaracao'}
        id={'formDeclaracao'}
        datatype=""
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className={'p-card-subtitle'}>Atenção para os campos obrigatórios (*)</div>
        <div className={'grid pt-4'}>
          <div className=" col-12 md:col-6">
            <h4 className={'pb-4'}>Dados da declaração</h4>
            {!filter.idInstalacaoDeclaracao && (
              <Container col={12}>
                <label htmlFor="empresa">Empresa*:</label>
                <AnttDropdown
                  id="empresa"
                  optionLabel="name"
                  filter
                  showClear
                  filterBy="name"
                  disabled={filter.disable}
                  value={filter.CNPJEmpresa}
                  options={filter.listaEmpresHabilitadas}
                  onChange={(e) => {
                  }}
                  className={classNames({
                    'p-invalid p-error': !filter.isValido && !filter.CNPJEmpresa,
                  })}
                />
              </Container>
            )}
            <Container col={12}>
              <label htmlFor="tipodeclaracao">Tipo de Declaração*:</label>
              <AnttDropdown
                id="tipocontato"
                disabled={filter.disable}
                value={filter.idTipoDeclaracao}
                options={filter.listTipoDeclaracao}
                onChange={(e) => {
                  filter.setIdTipoDeclaracao(e.target.value);
                }}
                className={classNames({
                  'p-invalid p-error': !filter.isValido && !filter.idTipoDeclaracao,
                })}
              />
              {!filter.isValido && !filter.idTipoDeclaracao && (
                <small className="p-invalid p-error p-d-block">
                  {Mensagem.MSG_E001('Tipo de Declaração')}
                </small>
              )}
            </Container>
            <Container col={12}>
              <label htmlFor="dataEmissao">Data de Emissão*: </label>
              <AnttCalendar
                id="dataEmissao"
                disabled={filter.disable}
                value={filter.dataEmissao}
                onChange={(e) => filter.setDataEmissao(e.target.value)}
                showIcon
                className={classNames({
                  'p-invalid p-error': !filter.isValido && !filter.dataEmissao,
                })}
              />
              {!filter.isValido && !filter.dataEmissao && (
                <small className="p-invalid p-error p-d-block">
                  {Mensagem.MSG_E001('Data Emissão')}
                </small>
              )}
            </Container>
            <Container col={12}>
              <label htmlFor="dataEmissao">Data de validade*:</label>
              <AnttCalendar
                id="dataValidade"
                disabled={filter.disable}
                value={filter.dataValidade}
                onChange={(e) => {
                  filter.setDataValidade(e.target.value);
                }}
                showIcon
                className={classNames({
                  'p-invalid p-error': !filter.isValido && !filter.dataValidade,
                })}
              />
              {!filter.isValido && !filter.dataValidade && (
                <small className="p-invalid p-error p-d-block">
                  {Mensagem.MSG_E001('Data Emissão')}
                </small>
              )}
            </Container>
            <Container col={12}>
              <label htmlFor="documento">Documento da Declaração*:</label>
              {!filter.disable && (
                <div className={' grid inline'}>
                  <input
                    type="file"
                    disabled={filter.disable}
                    onChange={(item) => item}
                    accept=".zip,.rar,.7zip,.pdf, .doc, .docx"
                  />
                  {!filter.isValido && !filter.idInstalacaoDeclaracao && !filter.file && (
                    <small className="p-invalid p-error p-d-block">
                      <br />
                      {Mensagem.MSG_E001('Documento')}
                    </small>
                  )}
                </div>
              )}
              {filter.idArquivo && (
                <Button
                  icon="pi pi-download"
                  type="button"
                  label={filter.nomeArquivo}
                  className="mt-2 pt-2 p-button-rounded p-button-rounded-info mr-2"
                  onClick={() => filter.idArquivo}
                  tooltip="Download"
                  tooltipOptions={{ position: 'top' }}
                />
              )}
            </Container>
          </div>
          <div className=" col-12 md:col-6">
            <h4 className={'pb-4'}>Emissor da declaração</h4>
            <Container col={12}>
              <label htmlFor="CPF">CPF*:</label>
              <AnttCpf
                disabled={filter.disable}
                maxLength={11}
                id="CPF"
                campo={filter.cpfNumero}
                setCampo={filter.setCpfNumero}
                placeholder="CPF"
                className={classNames({
                  'p-invalid p-error':
                    !filter.isValido && !Validacoes.IsCPFValido(filter.cpfNumero),
                })}
              />
              {!filter.isValido && !Validacoes.IsCPFValido(filter.cpfNumero) && (
                <small className="p-invalid p-error p-d-block">{Mensagem.MSG_E001('CPF')}</small>
              )}
              {!filter.isValido && !Validacoes.IsCPFValido(filter.cpfNumero) && (
                <small className="p-invalid p-error p-d-block">{Mensagem.CPF_INVALIDO}</small>
              )}
            </Container>
            <Container col={12}>
              <label htmlFor="nome">Nome*:</label>
              <InputText
                disabled={filter.disable}
                maxLength={200}
                id="nome"
                value={filter.nome}
                onChange={(e) => filter.setNome(e.target.value)}
                placeholder="Nome"
                className={classNames({
                  'p-invalid p-error': !filter.isValido && filter.nome.length === 0,
                })}
              />
              {!filter.isValido && filter.nome.length === 0 && (
                <small className="p-invalid p-error p-d-block">{Mensagem.MSG_E001('Nome')}</small>
              )}
            </Container>
            <Container col={12}>
              <label htmlFor="CPF">Nº de Registro*:</label>
              <InputText
                disabled={filter.disable}
                id="nRegistro"
                value={filter.codigoRegistro}
                onChange={(e) => filter.setCodigoRegistro(e.target.value)}
                placeholder="Nº de Registro"
                className={classNames({
                  'p-invalid p-error': !filter.isValido && filter.codigoRegistro.length === 0,
                })}
              />
              {!filter.isValido && filter.codigoRegistro.length === 0 && (
                <small className="p-invalid p-error p-d-block">
                  {Mensagem.MSG_E001('Nº de Registro')}
                </small>
              )}
            </Container>

            <Container col={12}>
              <label htmlFor="telefone">Telefone*:</label>
              <InputText
                disabled={filter.disable}
                id="telefone"
                maxLength={15}
                value={filter.telefone}
                onChange={(e) => filter.setTelefone(Utils.aplicarMacaraTeleone(e.target.value))}
                placeholder="Contato"
                className={classNames({
                  'p-invalid block p-error ':
                    !filter.isValido && (filter.telefone === '' || filter.telefone.length < 14),
                })}
              />
              {!filter.isValido && !filter.telefone && (
                <small className="p-invalid p-error p-d-block">
                  {Mensagem.MSG_E001('telefone')}
                </small>
              )}
              {!filter.isValido && filter.telefone.length < 14 && filter.telefone.length > 0 && (
                <small className="p-invalid p-error p-d-block">Telefone invalido</small>
              )}
            </Container>
            <Container col={12}>
              <label htmlFor="email ">E-mail*:</label>
              <InputText
                disabled={filter.disable}
                id="email"
                value={filter.email}
                onChange={(e) => filter.setEmail(e.target.value)}
                placeholder="E-mail"
                className={classNames({
                  'p-invalid p-error':
                    !filter.isValido && (!filter.email || !Validacoes.validaEmail(filter.email)),
                })}
              />
              {!filter.isValido && !filter.email && (
                <small className="p-invalid p-error p-d-block">{Mensagem.MSG_E001('E-mail')}</small>
              )}
              {!filter.isValido &&
                filter.email.length > 0 &&
                !Validacoes.validaEmail(filter.email) && (
                  <small className="p-invalid p-error p-d-block">E-mail Invalido</small>
                )}
            </Container>
          </div>
          {filter.disable === false && (
            <div className={'grid'}>
              <Container col={12} className={'inline'}>
                <Checkbox
                  inputId="cb1"
                  value={1}
                  onChange={(e) => filter.setConcordo(e.checked)}
                  checked={filter.concordo}
                  className={classNames({
                    'p-invalid p-error': !filter.isValido && !filter.concordo,
                  })}
                />
                <label htmlFor="cb1" className="p-checkbox-label pl-2">
                  Declaro estar ciente pelas informações prestadas e de que a falsidade nas
                  informações acima implicará nas penalidades cabíveis.
                </label>{' '}
                <br />
                {!filter.isValido && !filter.concordo && (
                  <small className="p-invalid p-error p-d-block">Campo é obrigatorio</small>
                )}
              </Container>
            </div>
          )}
        </div>
      </form>
    </Dialog>
  );
};

export default DialogDeclaracao;
