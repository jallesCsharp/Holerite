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
    id: 'usuarios',
    label: 'Usuário',
    icon: 'pi pi-user-edit',
    modulo: 'USUARIOS',
    items: [
      {
        id: 'perfil_usuarios',
        label: 'Perfil',
        url: '/usuarios/perfil',
        modulo: 'PERFIL_USUARIO',
      },
      {
        id: 'listar-usuarios',
        label: 'Listar Usuários',
        url: '/usuarios/listar',
        modulo: 'USUARIO_LISTAR',
      },
    ],
  },
  {
    label: 'Holerite',
    icon: 'pi pi-id-card',
    modulo: 'HOLERITE',
    id: 'holerite',
    items: [
      {
        id: 'cadastrar-holerite',
        label: 'Carrega Arquivo',
        url: '/holerite/arquivo',
        modulo: 'HOLERITE_ARQUIVO',
      },
      {
        id: 'holerite-pendentes',
        label: 'Pendente Notificação',
        url: '/holerite/holeritePendenteNotificacao',
        modulo: 'HOLERITE_PENDENTE_NOTIFICACAO',
      },
      {
        id: 'listar-holerite',
        label: 'Listar Holerite',
        url: '/holerite/holeriteLista',
        modulo: 'HOLERITE_LISTA',
      },
    ],
  },
  // {
  //   label: 'Acompanhamento',
  //   icon: 'pi pi-cog',
  //   items: [
  //     {
  //       id: 'instalacao-consultar',
  //       label: 'Atendimentos',
  //       url: '/instalacao',
  //       modulo: 'INSTALACAO',
  //     },
  //     {
  //       id: 'instalacao-consultar',
  //       label: 'Agenda',
  //       url: '/instalacao',
  //       modulo: 'INSTALACAO',
  //     },
  //   ],
  // },
  // {
  //   id: 'relatorio',
  //   icon: 'pi pi-cog',
  //   label: 'Relatório',
  //   modulo: 'RELATORIO',
  //   items: [
  //     {
  //       id: 'relatorio_empresa',
  //       label: 'Instalações por Empresa',
  //       url: '/relatorio/empresa',
  //       modulo: 'RELATORIO_EMPRESA',
  //     },
  //     {
  //       id: 'historico_alteracao_instalacao',
  //       label: 'Histórico de Alterações da Instalação',
  //       url: '/relatorio/historico-instalacao',
  //       modulo: 'RELATORIO_HISTORICO_ALTERACAO_INSTALACAO',
  //     },
  //   ],
  // },
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
