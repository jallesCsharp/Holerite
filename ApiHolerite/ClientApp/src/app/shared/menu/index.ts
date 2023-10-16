import { MenuItem } from '../../../provider/@types/menu';

export const menuItems: MenuItem[] = [
  {
    label: 'Página inicial',
    icon: 'pi pi-fw pi-home',
    url: '/Home',
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
        url: '/Usuarios/Perfil',
        modulo: 'USUARIOS_PERFIL',
      },
      {
        id: 'listar-usuarios',
        label: 'Listar Usuários',
        url: '/Usuarios/Listar',
        modulo: 'USUARIOS_LISTAR',
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
        label: 'Importa Arquivo',
        url: '/Holerite/Arquivo',
        modulo: 'HOLERITE_ARQUIVO',
      },
      {
        id: 'holerite-pendentes',
        label: 'Pendente Notificação',
        url: '/Holerite/PendenteNotificacao',
        modulo: 'HOLERITE_PENDENTE_NOTIFICACAO',
      },
      {
        id: 'listar-holerite',
        label: 'Listar Holerite',
        url: '/Holerite/HoleriteLista',
        modulo: 'HOLERITE_LISTA',
      },
      {
        id: 'listar-holerite',
        label: 'Arquivos Importados',
        url: '/Holerite/ListaArquivosImportados',
        modulo: 'HOLERITE_LISTA_ARQUIVOS_IMPORTADOS',
      },
    ],
  },
  {
    label: 'Configurações',
    icon: 'pi pi-cog',
    modulo: 'CONFIGURACAO',
    items: [
      {
        id: 'configuracoes-arquivos',
        label: 'Arquivos',
        url: '/Configuracoes/Arquivos',
        modulo: 'CONFIGURACAO_ARQUIVOS',
      },
      {
        id: 'configuracoes-perfil',
        label: 'Perfil de Grupos',
        url: '/Configuracoes/Perfil',
        modulo: 'CONFIGURACAO_PERFIL_GRUPOS',
      },
    ],
  },
];
