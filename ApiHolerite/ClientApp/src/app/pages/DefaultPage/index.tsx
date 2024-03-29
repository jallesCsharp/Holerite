import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './Home';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import RelatorioPage from './Relatorio';
import Default from '../../../provider/components/Layouts/Default';
import { BlockUIState } from '../../../provider/redux/@types/blockUI';
import BlockUIService from '../../../provider/services/blockUIService';
import UsuariosPage from './Usuarios';
import { menuItems } from '../../shared/menu';
import LoginPage from '../Login';
import ConfiguracoesPage from './Configuracoes';
import HoleritePage from './Holerite';
import AuthService from '../../../provider/services/authService';
import { MenuItem } from '../../../provider/@types/menu';

const DefaultPage = () => {
  const blockUI: BlockUIState = new BlockUIService().getCurrentState();
  const authService = new AuthService();
  const [lista, setLista]: any = useState<any>([]);

  // const history = useHistory();
  const localion = useLocation();

  // const decodedJwt = jsonWebTokenService.decode(jwt)

  function filtraMenu(menu: MenuItem[]) {
    let novoMenu = [...menu];
    novoMenu = novoMenu.filter((f: MenuItem) => authService.temPermissao(f.modulo));

    novoMenu.forEach((item) => {
      item.items = item.items?.filter((filterSubMenu) =>
        authService.temPermissaoItens(filterSubMenu.modulo),
      );
    });

    return novoMenu;
  }

  useEffect(() => {
    blockUI.blocked = true;
    // } else if(window.location.href.indexOf('login') < 0){
    //   authService.save(authService.getUser());
    // }
    const temp = [...menuItems];
    // console.log('menu');
    // console.log(temp);
    const pathNameList = localion.pathname.split('/');
    const pathName = pathNameList.length > 1 ? pathNameList[1] : '';
    temp.forEach((x) => (x.className = x.id === pathName ? 'active' : ''));
    setLista([...filtraMenu(temp)]);
    blockUI.blocked = false;
  }, [localion]);

  return (
    <>
      <BlockUI
        blocked={blockUI.blocked}
        template={<ProgressSpinner />}
        autoZIndex={true}
        baseZIndex={6000}
        fullScreen
      >
        <Default menuItems={lista}>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/usuarios" component={UsuariosPage} />
            <Route path="/holerite" component={HoleritePage} />
            <Route path="/relatorio" component={RelatorioPage} />
            <Route path="/Configuracoes" component={ConfiguracoesPage} />
            <Route path="/logout" component={LoginPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Default>
      </BlockUI>
    </>
  );
};

export default DefaultPage;
