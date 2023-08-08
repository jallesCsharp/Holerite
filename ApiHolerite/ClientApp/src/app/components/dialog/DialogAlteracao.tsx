import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DialogAlteracaoFilter from '../models/DialogAlteracaoFilter';
import { InputTextarea } from 'primereact/inputtextarea';
import { classNames } from 'primereact/utils';
import { Mensagem } from '../../shared/mensagem/Mensagem';
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import AnttDropdown from '../../../provider/components/Dropdown';
import Container from '../../../provider/components/Container';

interface Props {
  filter: DialogAlteracaoFilter;
  controller: any;
}

const dialogFooter = (controller: any, filter: DialogAlteracaoFilter) => {
  return (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        type={'button'}
        className="p-button-text"
        onClick={() => {
          filter.setIsVisible(false);
          filter.setLista([]);
          filter.setProcessoSei('');
          filter.setValueLista(null);
          filter.setJustificativa('');
          filter.setDisableProcessoSei(false);
          filter.setSemProcessoSei(false);
        }}
      />
      <Button
        type={'button'}
        label={filter.labelBotao}
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => {
          controller.dialogAlteracao();
        }}
      />
    </>
  );
};
const semVinculo = (e: CheckboxChangeParams, filter: DialogAlteracaoFilter) => {
  filter.setSemProcessoSei(e.checked);
  filter.setDisableProcessoSei(e.checked);
};
const DialogAlteracao: React.FC<Props> = ({ filter, controller }) => {
  return (
    <Dialog
      header={filter.title}
      visible={filter.isVisible}
      modal
      onHide={() => {
        filter.setIsVisible(false);
        filter.setLista([]);
        filter.setProcessoSei('');
        filter.setValueLista(null);
        filter.setJustificativa('');
        filter.setDisableProcessoSei(false);
        filter.setSemProcessoSei(false);
      }}
      footer={dialogFooter(controller, filter)}
      style={{ minWidth: '700px', minHeight: '300px' }}
    >
      <div className={'grid'}>
        <div className=" col-12 md:col-6 pr-2">
          <Container col={12} className="p-0 pt-2 ">
            <label htmlFor="combo">Não vincular ao Processo Sei*:</label>
            <Checkbox
              inputId="cb1"
              value="New York"
              onChange={(e) => semVinculo(e, filter)}
              checked={filter.semProcessoSei}
            />
          </Container>
          {!filter.semProcessoSei && (
            <Container col={12} className="p-0 pt-2 ">
              <label htmlFor="combo">Processo SEI*: </label>
              <InputText
                value={filter.processoSei}
                onChange={(e) => filter.setProcessoSei(e.target.value)}
                disabled={filter.disableProcessoSei}
                className={classNames({
                  'p-invalid p-error':
                    !filter.isValido &&
                    filter.disableProcessoSei === false &&
                    filter.processoSei.length === 0,
                })}
              />
              {!filter.isValido &&
                filter.disableProcessoSei === false &&
                filter.processoSei.length === 0 && (
                  <small className="p-invalid p-error p-d-block">
                    {Mensagem.MSG_E001('Processo SEI')}
                  </small>
                )}
            </Container>
          )}
        </div>
        <div className=" col-12 md:col-6">
          {filter.lista.length >= 1 && (
            <Container col={12} className="p-0 pt-2">
              <label htmlFor="combo">{filter.tituloLista}*:</label>
              <AnttDropdown
                id="combo"
                value={filter.valueLista}
                options={filter.lista}
                onChange={(e) => {
                  filter.setValueLista(e.target.value);

                  const obj: any = filter.lista.filter((item: any) => {
                    if (item.value === e.target.value) {
                      return item;
                    }
                  });
                  if (obj && obj[0] && obj[0].justificativa) {
                    filter.setJustificativa(obj[0].justificativa);
                  } else {
                    filter.setJustificativa('');
                  }
                }}
                className={classNames({
                  'p-invalid p-error': !filter.isValido && !filter.valueLista && !filter.valueLista,
                })}
              />
              {!filter.isValido && filter.lista.length > 0 && !filter.valueLista && (
                <small className="p-invalid p-error p-d-block">{Mensagem.MSG_E001('pais')}</small>
              )}
            </Container>
          )}

          <Container col={12} className="p-0 pt-2">
            <label htmlFor="justificativa">Justificativa:</label>
            <InputTextarea
              id="justificativa"
              cols={3}
              autoResize={true}
              value={filter.justificativa}
              onChange={(e) => filter.setJustificativa(e.target.value)}
              placeholder="Justificativa"
              className={classNames({
                'p-invalid p-error': !filter.isValido && filter.justificativa.length === 0,
              })}
            />
            {!filter.isValido && filter.justificativa.length === 0 && (
              <small className="p-invalid p-error p-d-block">{Mensagem.MSG_E001('pais')}</small>
            )}
          </Container>
        </div>
      </div>
    </Dialog>
  );
};
export default DialogAlteracao;
