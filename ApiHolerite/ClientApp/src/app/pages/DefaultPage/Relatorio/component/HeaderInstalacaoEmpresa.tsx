import React from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import InstalacaoEmpresaController from '../controllers/InstalacaoEmpresaController';
import InstalacaoEmpresaFilter from '../models/InstalacaoEmpresaFilter';
import Container from '../../../../../provider/components/Container';
import AnttDropdown from '../../../../../provider/components/Dropdown';

interface Props {
  filter: InstalacaoEmpresaFilter;
  controller: InstalacaoEmpresaController;
}

const HeaderInstalacaoEmpresa: React.FC<Props> = ({ filter, controller }) => {
  return (
    <Card title="Relatório de Instalações por Empresa" className={'mb-3'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          controller.getRelatorioInstacaoEmpresa();
        }}
      >
        <div className="grid">
          <Container col={4}>
            <label htmlFor="NomeEmpresa">Empresa:</label>
            <InputText
              id="NomeEmpresa"
              value={filter.nomeEmpresa}
              onChange={(e) => filter.setNomeEmpresa(e.target.value)}
              placeholder="Empresa"
            />
          </Container>

          <Container col={4}>
            <label htmlFor="nomeInstalacao">Nome da Instalação:</label>
            <InputText
              id="nomeInstalacao"
              value={filter.nomeInstalacao}
              onChange={(e) => filter.setNomeInstalacao(e.target.value)}
              placeholder="Nome da Instalação"
            />
          </Container>

          <Container col={4}>
            <label htmlFor="situacaoInstalacao">Situação da Instalação:</label>
            <AnttDropdown
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
            <AnttDropdown
              id="pais"
              value={filter.pais}
              options={filter.listaPais}
              onChange={(e) => controller.selecionarPais(e.target.value)}
            />
          </Container>

          <Container col={2}>
            <label htmlFor="uf">UF:</label>
            <AnttDropdown
              id="uf"
              value={filter.uf}
              options={filter.listaUf}
              onChange={(e) => controller.selecionarUf(e.target.value)}
            />
          </Container>

          <Container col={3}>
            <label htmlFor="municipio">Município:</label>
            <AnttDropdown
              id="municipio"
              value={filter.municipio}
              options={filter.listaMunicipio}
              onChange={(e) => filter.setMunicipio(e.target.value)}
            />
          </Container>
          <Container col={4}>
            <label htmlFor="situacaoEmpresa">Situação da Empresa:</label>
            <AnttDropdown
              id="situacaoEmpresa"
              value={filter.situacaoEmpresa}
              options={filter.listaSituacaoEmpresa}
              onChange={(e) => filter.setSituacaoEmpresa(e.target.value)}
            />
          </Container>
        </div>
        <div className={'grid pt-2 justify-content-end'}>
          <Container col={2} className="justify-content">
            <Button
              className="p-button-secondary"
              type={'button'}
              label="Limpar"
              onClick={() => controller.limpar()}
            />
          </Container>
          <Container col={2} className="justify-content">
            <Button className="p-button-secondary" label="Consultar" />
          </Container>
        </div>
      </form>
    </Card>
  );
};
export default HeaderInstalacaoEmpresa;
