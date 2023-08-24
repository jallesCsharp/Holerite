import { useHistory } from 'react-router-dom';
import AbstractController from '../../../../../provider/services/abstractController';
import FileFilter from '../models/FileFilter';
import ToastService from '../../../../../provider/services/toastService';
import ArquivoService from '../../../../services/ArquivoService';
import { Mensagem } from '../../../../shared/mensagem/Mensagem';

export default class HoleriteController extends AbstractController {
  public filter: FileFilter;

  history = useHistory();

  private arquivoService = new ArquivoService();

  constructor(filter: FileFilter) {
    super();
    this.filter = filter;
    this.history = useHistory();
  }

  init() {
    super.init();
    this.breadCrumbService.change([
      {
        label: 'Holerite',
        id: 'holerite-arquivo',
      },
    ]);
  }

  public async limparFilter() {
    this.filter.setFile('');
    this.filter.setEnviar(false);
    this.filter.setLoading(false);
  }

  public voltaNav() {
    //this.history.goBack();
  }

  // public async CarregarLista() {
  //   this.history.replace('/holerite/holerite-lista');
  // }

  public async customBase64Uploader(event: any) {
    const file = event.files[0];
    const formData = new FormData();
    formData.append('FormFile', file);
    formData.append('File', file);
    formData.append('FileName', file.name);
    return formData;

    //await this.UploadHolerite(formData);
  }

  public async UploadHolerite(formFile?: FormData) {
    try {
      console.log('UploadHolerite');
      this.blockUIService.start();
      await this.arquivoService.UploadHolerite(formFile).then((result) => {
        console.log(result);
        if (result.success == false) {
          ToastService.showError(result.errors);
          return;
        }
        return result.data;
      });
      await this.limparFilter();
      this.blockUIService.stop();
    } catch (error) {
      ToastService.showError(Mensagem.ERROR_501);
      await this.limparFilter();
      this.blockUIService.stop();
    }
  }
}
