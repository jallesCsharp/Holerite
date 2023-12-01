import { useState } from 'react';
import AbstractController from '../../../../provider/services/abstractController';
import AuthService from '../../../../provider/services/authService';
import { LoginModel } from '../../../@types/model/LoginModel';
import LoginService from '../../../services/LoginService';
import ToastService from '../../../../provider/services/toastService';

export default class LoginController extends AbstractController {
  private loginService = new LoginService();

  private authService = new AuthService();

  public loginModel?: any;

  private setLoginModel: any;

  public submitted?: boolean;

  private SetSubmitted: (e: any) => void;

  constructor() {
    super();
    [this.loginModel, this.setLoginModel] = useState();
    [this.submitted, this.SetSubmitted] = useState<boolean>(false);
  }

  init() {
    super.init();
  }

  public async logar(data: LoginModel) {
    this.blockUIService.start();
    console.log('Inicio');
    if (!data.cpf || data.cpf.length == 0 || !data.password || data.password.length == 0) {
      console.log('validação if');
      return this.SetSubmitted(true);
    }
    try {
      const response = await this.loginService.authLogin(data);

      console.log('logar');
      console.log(response);

      if (response.data?.toString() === '400') {
        console.log('400');
        console.log(response.data);
        return response.errors;
      } else if (response.success) {
        this.setLoginModel(response.data);
        console.log('boject');
        console.log(Object.values(response)[1]);
        const logado = Object.values(response)[1];
        this.authService.save(logado);
        window.location.href = '/';
      }
    } catch (err: any) {
      ToastService.showError(err);
      this.blockUIService.stop();
    }
    this.blockUIService.stop();
  }
}
