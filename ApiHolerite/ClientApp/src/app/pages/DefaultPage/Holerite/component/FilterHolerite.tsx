import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Container from '../../../../../provider/components/Container';
import ArquivosFilter from '../models/ArquivosFilter';
import ArquivosHoleriteController from '../controllers/ArquivosHoleriteController';
import PropDropdown from '../../../../../provider/components/Dropdown';
import ProAutoComplete from '../../../../../provider/components/AutoComplete';
// import ToastService from '../../../../../provider/services/toastService';

interface Props {
  filter: ArquivosFilter;
  controller: ArquivosHoleriteController;
}

const FilterHolerite: React.FC<Props> = ({ filter, controller }) => {
  function onLimparupload() {
    filter.setMes(2);
  }

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
              <ProAutoComplete
                id="NomePessoa"
                value={filter.pessoasModel?.Nome}
                suggestions={filter.listaEmpresaAuto}
                completeMethod={controller.GetAllListaPessoas()}
                onChange={(e: any) => filter.setPessoaNome(e.target.value)}
                placeholder="Nome Pessoa"
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

            <div className="grid">
              {/* 
              

              <Container col={4}>
                <label htmlFor="situacaoInstalacao">Situação da Instalação:</label>
                <PropDropdown
                  id="situacaoInstalacao"
                  value={filter.situacaoInstalacao}
                  options={filter.listaSituacaoInstacacao}
                  onChange={(e) => {
                    filter.setSituacaoInstalacao(e.target.value);
                  }}
                />
              </Container>

              <Container col={3}>
                <label htmlFor="pais">País:</label>
                <PropDropdown
                  id="pais"
                  value={filter.pais}
                  options={filter.listaPais}
                  onChange={(e) => controller.selecionarPais(e.target.value)}
                />
              </Container>

              <Container col={2}>
                <label htmlFor="uf">UF:</label>
                <PropDropdown
                  id="uf"
                  value={filter.uf}
                  options={filter.listaUf}
                  onChange={(e) => controller.selecionarUf(e.target.value)}
                />
              </Container>

              <Container col={3}>
                <label htmlFor="municipio">Município:</label>
                <PropDropdown
                  id="municipio"
                  value={filter.municipio}
                  options={filter.listaMunicipio}
                  onChange={(e) => filter.setMunicipio(e.target.value)}
                />
              </Container>
              <Container col={4}>
                <label htmlFor="situacaoEmpresa">Situação da Empresa:</label>
                <PropDropdown
                  id="situacaoEmpresa"
                  value={filter.situacaoEmpresa}
                  options={filter.listaSituacaoEmpresa}
                  onChange={(e) => filter.setSituacaoEmpresa(e.target.value)}
                />
              </Container> */}
            </div>
            {/* <Container col={4} sm={5}>
              <></>
            </Container>

            <Container col={5}>
              <></>
            </Container> */}

            <Container col={12} sm={12} md={12}>
              <div className="button">
                <Button
                  id="pesquisar"
                  className="p-button-secondary mr-2"
                  style={{ fontSize: '1em' }}
                  label="Pesquisar"
                  onClick={() => ''}
                />
                <Button
                  id="Volar"
                  className="p-button-secondary mr-2"
                  style={{ fontSize: '1em' }}
                  label="Volar"
                />
                <Button
                  id="Limpar"
                  className="p-button-secondary mr-2"
                  style={{ fontSize: '1em' }}
                  label="Limpar"
                  onClick={onLimparupload}
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

// <form
//   onSubmit={(e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     controller.getRelatorioInstacaoEmpresa();
//   }}
// >
//   <div className="grid">
//     <Container col={4}>
//       <label htmlFor="NomeEmpresa">Empresa:</label>
//       <InputText
//         id="NomeEmpresa"
//         value={filter.nomeEmpresa}
//         onChange={(e) => filter.setNomeEmpresa(e.target.value)}
//         placeholder="Empresa"
//       />
//     </Container>

//     <Container col={4}>
//       <label htmlFor="nomeInstalacao">Nome da Instalação:</label>
//       <InputText
//         id="nomeInstalacao"
//         value={filter.nomeInstalacao}
//         onChange={(e) => filter.setNomeInstalacao(e.target.value)}
//         placeholder="Nome da Instalação"
//       />
//     </Container>

//     <Container col={4}>
//       <label htmlFor="situacaoInstalacao">Situação da Instalação:</label>
//       <PropDropdown
//         id="situacaoInstalacao"
//         value={filter.situacaoInstalacao}
//         options={filter.listaSituacaoInstacacao}
//         onChange={(e) => {
//           filter.setSituacaoInstalacao(e.target.value);
//         }}
//       />
//     </Container>

//     <Container col={3}>
//       <label htmlFor="pais">País:</label>
//       <PropDropdown
//         id="pais"
//         value={filter.pais}
//         options={filter.listaPais}
//         onChange={(e) => controller.selecionarPais(e.target.value)}
//       />
//     </Container>

//     <Container col={2}>
//       <label htmlFor="uf">UF:</label>
//       <PropDropdown
//         id="uf"
//         value={filter.uf}
//         options={filter.listaUf}
//         onChange={(e) => controller.selecionarUf(e.target.value)}
//       />
//     </Container>

//     <Container col={3}>
//       <label htmlFor="municipio">Município:</label>
//       <PropDropdown
//         id="municipio"
//         value={filter.municipio}
//         options={filter.listaMunicipio}
//         onChange={(e) => filter.setMunicipio(e.target.value)}
//       />
//     </Container>
//     <Container col={4}>
//       <label htmlFor="situacaoEmpresa">Situação da Empresa:</label>
//       <PropDropdown
//         id="situacaoEmpresa"
//         value={filter.situacaoEmpresa}
//         options={filter.listaSituacaoEmpresa}
//         onChange={(e) => filter.setSituacaoEmpresa(e.target.value)}
//       />
//     </Container>
//   </div>
//   <div className={'grid pt-2 justify-content-end'}>
//     <Container col={2} className="justify-content">
//       <Button
//         className="p-button-secondary"
//         type={'button'}
//         label="Limpar"
//         onClick={() => controller.Limpar()}
//       />
//     </Container>
//     <Container col={2} className="justify-content">
//       <Button className="p-button-secondary" label="Consultar" />
//     </Container>
//   </div>
// </form>;
