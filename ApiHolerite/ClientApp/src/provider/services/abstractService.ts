import BlockUIService from './blockUIService';
import BreadCrumbService from './breadCrumbService';
import { AxiosInstance } from 'axios';
import ToastService from './toastService';
import { Mensagem } from '../../app/shared/mensagem/Mensagem';
import AuthService from './authService';

export default class AbstractService {
  public blockUIService: BlockUIService;

  public breadCrumbService: BreadCrumbService;

  private authService: AuthService;

  protected api: AxiosInstance;

  protected rota: string;

  constructor(api: any, rota: string) {
    this.blockUIService = new BlockUIService();
    this.breadCrumbService = new BreadCrumbService();
    this.authService = new AuthService();
    this.api = api;
    this.rota = rota;
  }

  public start() {
    this.blockUIService.start();
  }

  public stop() {
    this.blockUIService.stop();
  }

  public getUser() {
    return this.authService.getUser();
  }

  public defaultCatch(err: any) {
    ToastService.showError(Mensagem.FALHA_REQUISICAO);
    this.stop();
    return err;
  }

  public defaultSuccess(res: any) {
    this.stop();
    if (res.succeeded) {
      return true;
    }
    ToastService.showError(Mensagem.ERRO);
    return false;
  }
}
