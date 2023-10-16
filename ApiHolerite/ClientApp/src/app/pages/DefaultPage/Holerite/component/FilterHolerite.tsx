import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Container from '../../../../../provider/components/Container';
import ArquivosFilter from '../models/ArquivosFilter';
import ArquivosHoleriteController from '../controllers/ArquivosHoleriteController';
import PropDropdown from '../../../../../provider/components/Dropdown';
import ProAutoComplete from '../../../../../provider/components/AutoComplete';
import { PessoasModel } from '../../../../@types/model/PessoasModel';
import { FilterArquivosHolerite } from '../../../../@types/filters/FilterArquivosHolerite';
// import ToastService from '../../../../../provider/services/toastService';

interface Props {
  filter: ArquivosFilter;
  controller: ArquivosHoleriteController;
}

const FilterHolerite: React.FC<Props> = ({ filter, controller }) => {
  const [pessoa, setPessoa] = useState<PessoasModel>();

  useEffect(() => {
    controller.init();
    controller.CarregarTela();
  }, []);

  function onLimparPesquisar() {
    filter.setMes(undefined);
    setPessoa(undefined);
    controller.PesquisarArquivos({ Mes: 0, Id: null, PessoaId: null, Nome: null });
  }

  async function onPesquisar() {
    let filterArq: FilterArquivosHolerite = {
      Id: null,
      Nome: pessoa?.nome === undefined ? null : pessoa.nome,
      PessoaId: pessoa?.id === undefined ? null : pessoa.id,
      Mes: filter.mes.id === undefined ? 0 : filter.mes.id,
    };
    console.log(filterArq);
    await controller.PesquisarArquivos(filterArq);
  }

  const itemtemplate = (item: any) => {
    return (
      <div>
        <div>{item.nome}</div>
      </div>
    );
  };

  return (
    <>
      <Card title="Lista Arquivos Holerite" className={'mb-12'}>
        <form
          id="holerite-cadastrar"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            controller.voltaNav();
          }}
        >
          <div className="grid">
            <Container col={4}>
              <label htmlFor="NomePessoa">Nome Pessoa:</label>
              {/* readOnly={showSearchUsuario ? true : false} */}
              <ProAutoComplete
                appendTo="self"
                readOnly={false}
                name="nome"
                value={pessoa}
                suggestions={controller.listaPessoaFilter}
                completeMethod={controller.searchPessoa()}
                field="nome"
                itemTemplate={itemtemplate}
                onChange={(e: any) => setPessoa(e.target.value)}
                placeholder="Nome Pessoa"
                forceSelection
              />
            </Container>

            <Container col={4}>
              <label htmlFor="mes">Mes:</label>
              <PropDropdown
                id="mes"
                value={filter.mes}
                options={filter.listaMes}
                onChange={(e) => controller.SelecionarMes(e.target.value)}
              />
            </Container>

            <Container col={12} sm={12} md={12}>
              <div className="button">
                <Button
                  id="pesquisar"
                  className="p-button-secondary mr-2"
                  style={{ fontSize: '1em' }}
                  label="Pesquisar"
                  onClick={onPesquisar}
                />
                <Button
                  id="Limpar"
                  className="p-button-secondary mr-2"
                  style={{ fontSize: '1em' }}
                  label="Limpar"
                  onClick={onLimparPesquisar}
                />
              </div>
              {/* <div>
                <embed src={`data:application/pdf;base64,${base64STR}`} />
              </div> */}
            </Container>
          </div>
        </form>
      </Card>
    </>
  );
};

export default FilterHolerite;
