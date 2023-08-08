import BreadCrumbService from './breadCrumbService';
import BlockUIService from './blockUIService';
import AuthService from './authService';
import { useRef } from 'react';
// import InstalacaoesService from '../../app/services/InstalacaoesService';
import ToastService from './toastService';
import { Mensagem } from '../../app/shared/mensagem/Mensagem';

interface OnInit {
  init: () => void;
}

export default class AbstractController implements OnInit {
  public breadCrumbService: BreadCrumbService;

  public blockUIService: BlockUIService;

  private _authService: AuthService;

  // private _instaService = new InstalacaoesService();

  public dt = useRef(null);

  constructor() {
    this.breadCrumbService = new BreadCrumbService();
    this.blockUIService = new BlockUIService();
    this._authService = new AuthService();
    this.dt = useRef(null);
  }

  init(): void {}

  public exportCSV(e: any) {
    if (e.current.props.totalRecords > 0) {
      e.current.exportCSV(true);
    } else {
      ToastService.showInfo(Mensagem.SEM_RESULTADO_EXPORTAR);
    }
  }

  public exportListCsv(lista: any[], nomeArquivo: string) {
    if (lista && lista.length > 0) {
      const campos = Object.keys(lista[0]);
      let csv = '';
      campos.forEach((campo) => {
        csv += this.alterarLabel(campo) + '; ';
      });
      csv += '\n';

      lista.forEach(function (row) {
        campos.forEach(function (campo) {
          csv += row[campo] + ' ; ';
        });
        csv += '\n';
      });
      // tslint:disable-next-line:prefer-const
      const link = document.createElement('a');
      link.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csv);
      link.target = '_blank';
      link.download = nomeArquivo + '.csv';
      link.click();
    } else {
      ToastService.showInfo(Mensagem.SEM_RESULTADO_EXPORTAR);
    }
  }

  private exportColumns(cols: any[]) {
    return cols.map((col) => ({ title: this.alterarLabel(col.header), dataKey: col.field }));
  }

  public exportPdf = (lista: any[], name: string | null, tamanhoPagina: string) => {
    if (lista && lista.length > 0) {
      const campos = Object.keys(lista[0]);
      const arrvalor = campos.map((item: any) => {
        return { field: item, header: item };
      });

      import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then(() => {
          const doc = new jsPDF.default('landscape', 'pt', tamanhoPagina);
          // @ts-ignore
          doc.autoTable(this.exportColumns(arrvalor), lista);
          doc.save(name ? name + '.pdf' : 'drid' + '.pdf');
        });
      });
    } else {
      ToastService.showInfo(Mensagem.SEM_RESULTADO_EXPORTAR);
    }
  };

  public exportExcel(list: any[], name: string | null) {
    if (list && list.length > 0) {
      import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(list);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, name ? name : 'lista');
      });
    } else {
      ToastService.showInfo(Mensagem.SEM_RESULTADO_EXPORTAR);
    }
  }

  public saveAsExcelFile(buffer: BlobPart, fileName: string) {
    // @ts-ignore
    import('file-saver').then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  }

  private alterarLabel(campo: string) {
    let novoLabel = campo;
    const lista = [
      { campo: 'IdInstalacao', label: 'Código' },
      { campo: 'CodigoInstalacao', label: 'Código da Instalação' },
      { campo: 'NomeEmpresa', label: 'Nome Empresa' },
      { campo: 'NomeInstalacao', label: 'Nome Instalação' },
      { campo: 'Pais', label: 'País' },
      { campo: 'UF', label: 'UF' },
      { campo: 'Municipio', label: 'Município' },
      { campo: 'SituacaoInstalacao', label: 'Situação Instalação' },
      { campo: 'Ativo', label: 'Ativo' },
      { campo: 'NomeTipoInstalacao', label: 'Tipo Instalação' },
      { campo: 'DataEmissao', label: 'Data Emissão' },
      { campo: 'CPFEmissor', label: 'CPF' },
      { campo: 'NomeEmissor', label: 'Nome Emissor' },
      { campo: 'CodigoRegistro', label: 'Código Registro' },
      { campo: 'TelefoneEmissor', label: 'Telefone' },
      { campo: 'DescricaoContato', label: 'Descrição Contato' },
      { campo: 'TipoContato', label: 'Tipo Contato' },
      { campo: 'TelefoneEmissor', label: 'Telefone' },
      { campo: 'CNPJEmpresa', label: 'CNPJ' },
      { campo: 'SituacaoInstalacaoEmpresa', label: 'Situaçàoo Instalação Empresa' },
      { campo: 'CPFGestor', label: 'CPF' },
      { campo: 'NomeGestor', label: 'Nome do Gestor' },
      { campo: 'TelefoneEmissor', label: 'Telefone' },
      { campo: 'EmailEmissor', label: 'E-mail' },
      { campo: 'NomeArquivo', label: 'Nome do Arquivo' },
      { campo: 'NomeGestor', label: 'Nome do Gestor' },
      { campo: 'Situacao', label: 'Situação' },
      { campo: 'IdTipoInstalacao', label: ' id Tipo Instalação' },
      { campo: 'NomeTipoContato', label: 'Tipo Contato' },
      { campo: 'STSituacao', label: 'Sigla Situação' },
    ];

    const novoCampo = lista.filter((item) => {
      if (campo === item.campo) {
        return item.campo;
      }
    });
    if (novoCampo && novoCampo.length > 0) {
      novoLabel = novoCampo[0].label;
    }
    return novoLabel;
  }
  // public downloadArquivo(nome: string, type: string, base64: string) {
  //   const link = document.createElement('a');
  //   // const dataType = this.getDataFile(type);
  //   // if (dataType) {
  //   //   link.href = 'data:' + dataType + ';base64,' + base64;
  //   //   link.download = nome + '.' + type;
  //   //   link.dispatchEvent(
  //   //     new MouseEvent('click', { bubbles: true, cancelable: true, view: window }),
  //   //   );
  //   // }
  // }
  // private getDataFile(type: string) {
  //   switch (type) {
  //     case 'doc':
  //       return 'application/msword';
  //       break;
  //     case 'csv':
  //       return 'text/csv';
  //       break;
  //     case 'docx':
  //       return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  //       break;
  //     case 'bmp':
  //       return 'image/bmp';
  //       break;
  //     case 'gif':
  //       return 'image/gif';
  //       break;
  //     case 'jpeg':
  //     case 'jpg':
  //       return 'image/jpeg';
  //       break;
  //     case 'json':
  //       return 'application/json';
  //       break;
  //     case 'odp':
  //       return 'application/vnd.oasis.opendocument.presentation';
  //       break;
  //     case 'ods':
  //       return 'application/vnd.oasis.opendocument.spreadsheet';
  //       break;
  //     case 'odt':
  //       return 'application/vnd.oasis.opendocument.text';
  //       break;
  //     case 'png':
  //       return 'image/png';
  //       break;
  //     case 'pdf':
  //       return 'application/pdf';
  //       break;
  //     case 'ppt':
  //       return 'application/vnd.ms-powerpoint';
  //       break;
  //     case 'pptx':
  //       return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  //       break;
  //     case 'rar':
  //       return 'application/vnd.rar';
  //       break;
  //     case 'tar':
  //       return 'application/x-tar';
  //       break;
  //     case 'tif':
  //     case 'tiff':
  //       return 'image/tiff';
  //       break;
  //     case 'xls':
  //       return 'application/vnd.ms-excel';
  //       break;
  //     case 'xlsx':
  //       return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  //       break;
  //     case 'zip':
  //       return 'application/zip';
  //       break;
  //     case 'txt':
  //       return 'text/plain';
  //       break;
  //     case 'vcs':
  //       return 'text/x-vcalendar';
  //       break;
  //     case 'svg':
  //       return 'image/svg+xml';
  //       break;
  //   }
  //   return '';
  // }
}
