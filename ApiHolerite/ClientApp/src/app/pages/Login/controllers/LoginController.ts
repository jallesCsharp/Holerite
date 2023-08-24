import { useState } from 'react';
import AbstractController from '../../../../provider/services/abstractController';
import AuthService from '../../../../provider/services/authService';
import ToastService from '../../../../provider/services/toastService';
import { LoginModel } from '../../../@types/model/LoginModel';
import { LoginService } from '../../../services/LoginService';

export default class LoginController extends AbstractController {
  private loginService = new LoginService();

  private authService = new AuthService();

  public loginModel?: any;

  private setLoginModel: any;

  constructor() {
    super();
    [this.loginModel, this.setLoginModel] = useState();
  }

  init() {
    super.init();
  }

  async logar(data: LoginModel) {
    if (!data.cpf || data.cpf.length == 0 || !data.senha || data.senha.length == 0) {
      return 'Informe o Login da rede e a Senha';
    }
    try {
      this.blockUIService.start();
      const response = await this.loginService.authLogin(data);
      if (response.data?.toString() === '400') {
        return response.errors;
      } else if (response.success) {
        this.setLoginModel(response.data);
        const logado = Object.values(response)[1];
        this.authService.save(logado);
        window.location.href = '/';
      }
    } catch (err: any) {
      ToastService.showError(err);
    }
    this.blockUIService.stop();
  }
}
