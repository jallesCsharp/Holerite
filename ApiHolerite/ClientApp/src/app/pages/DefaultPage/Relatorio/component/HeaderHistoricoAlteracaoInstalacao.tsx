import React from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import HistoricoAlteracaoInstalacaoFilter from '../models/HistoricoAlteracaoInstalacaoFilter';
import HistoricoAlteracaoInstalacaoController from '../controllers/HistoricoAlteracaoInstalacaoController';
import Container from '../../../../../provider/components/Container';
import PropDropdown from '../../../../../provider/components/Dropdown';

interface Props {
  filter: HistoricoAlteracaoInstalacaoFilter;
  controller: HistoricoAlteracaoInstalacaoController;
}

const HeaderHistoricoAlteracaoInstalacao: React.FC<Props> = ({ filter, controller }) => {
  return (
    <Card title="Histórico de Alteração da Instalação" className={'mb-3'}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          controller.getRelatorio();
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
            <label htmlFor="nomeUsuario">Nome do Usuário:</label>
            <InputText
              id="nomeUsuario"
              value={filter.nomeUsuario}
              onChange={(e) => filter.setNomeUsuario(e.target.value)}
              placeholder="Nome do Usuário"
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
            <label htmlFor="campo">Campo Alterado:</label>
            <PropDropdown
              id="campo"
              value={filter.campo}
              options={filter.listaCampos}
              onChange={(e) => filter.setCampo(e.target.value)}
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
export default HeaderHistoricoAlteracaoInstalacao;
