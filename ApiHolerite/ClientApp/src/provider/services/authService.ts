import { ReduxInterface } from './reduxInterface';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../redux/reducer';
import AuthActionTypes from '../redux/auth/authActionTypes';
import { User } from '../redux/@types/auth';
import { useHistory } from 'react-router-dom';

export default class AuthService implements ReduxInterface {
  public dispatch: any;

  private history = useHistory();

  constructor() {
    this.dispatch = useDispatch();
  }

  public save(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('authToken', `${user.access_token?.toString()}`);
    const temp = { ...user };
    this.dispatch({ type: AuthActionTypes.SAVE, user: temp });
  }

  public remove() {
    sessionStorage.setItem('user', '');
    sessionStorage.setItem('authToken', '');
    this.dispatch({ type: AuthActionTypes.REMOVE });
  }

  public getUser() {
    const userStr = sessionStorage.getItem('user');
    if (!userStr || userStr === '') {
      return undefined;
    }
    return JSON.parse(userStr);
  }

  public verificaPermissaoAcessoPagina(permissao: any) {
    if (this.temPermissao(permissao)) {
      return;
    }
    this.history.push('/');
  }

  public isAuthenticated() {
    const user = this.getUser();
    return !!user;
  }

  public getCurrentState() {
    debugger;
    return useSelector((state: AppStore) => state.auth, shallowEqual);
  }

  public temPermissao(permissao: any) {
    console.log('Permissao');
    console.log(permissao);
    if (!permissao) {
      return false;
    }
    const user = this.getUser();
    if (!user || !user.permissoes || user.permissoes.length === 0) {
      return false;
    }
    return (
      user.permissoes.filter((f: any) => {
        if (!f) {
          return false;
        }
        const split = f.split(':');
        if (split.length < 2) {
          return false;
        }
        return split[1] === permissao;
      }).length > 0
    );
  }
}
