import { useHistory } from 'react-router-dom';
import AbstractController from '../../../../provider/services/abstractController';
import AuthService from '../../../../provider/services/authService';

export default class LogoutController extends AbstractController {
  private authService = new AuthService();

  private history = useHistory();

  init() {
    super.init();
    const user = this.authService.getUser();
    if (!user) {
      this.history.push('/home');
      return;
    }
    this.authService.remove();
    window.location.href = '/login';
  }
}
