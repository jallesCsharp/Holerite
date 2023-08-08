import { MenuItem } from '../../../provider/@types/menu';

export const menuItems: MenuItem[] = [
  {
    label: 'Página inicial',
    icon: 'pi pi-fw pi-home',
    url: '/home',
    modulo: 'MOD_HOME',
    id: 'home',
  },
  {
    id: 'usuario',
    icon: 'pi pi-user-edit',
    label: 'Usuário',
    url: '/usuario',
    modulo: 'USUARIOS',
  },
  {
    label: 'Holerite',
    icon: 'pi pi-id-card',
    modulo: 'HOLERITE',
    id: 'holerite',
    items: [
      {
        label: 'Carrega Arquivo',
        url: '/holerite/arquivo',
        modulo: 'HOLERITE-ARQUIVO',
        id: 'cadastrar-holerite',
      },
      {
        id: 'listar-cadastro',
        label: 'Listar Holerite',
        url: '/holerite/holerite-lista',
        modulo: 'HOLERITE-LISTA',
      },
    ],
  },
  {
    label: 'Acompanhamento',
    icon: 'pi pi-cog',
    items: [
      {
        id: 'instalacao-consultar',
        label: 'Atendimentos',
        url: '/instalacao',
        modulo: 'INSTALACAO',
      },
      {
        id: 'instalacao-consultar',
        label: 'Agenda',
        url: '/instalacao',
        modulo: 'INSTALACAO',
      },
    ],
  },
  {
    id: 'relatorio',
    icon: 'pi pi-cog',
    label: 'Relatório',
    modulo: 'RELATORIO',
    items: [
      {
        id: 'relatorio_empresa',
        label: 'Instalações por Empresa',
        url: '/relatorio/empresa',
        modulo: 'RELATORIO_EMPRESA',
      },
      {
        id: 'historico_alteracao_instalacao',
        label: 'Histórico de Alterações da Instalação',
        url: '/relatorio/historico-instalacao',
        modulo: 'RELATORIO_HISTORICO_ALTERACAO_INSTALACAO',
      },
    ],
  },
  {
    label: 'Configurações',
    icon: 'pi pi-cog',
    items: [
      {
        id: 'configuracoes-grupos',
        label: 'Arquivos',
        url: '/Configuracoes/Arquivos',
        modulo: 'CONFIGURACAO',
      },
      {
        id: 'configuracoes-grupos',
        label: 'Grupos',
        url: '/Configuracoes/Grupos',
        modulo: 'CONFIGURACAO',
      },
    ],
  },
];
