import Moment from 'moment';
import { Mensagem } from '../mensagem/Mensagem';
import { Validacoes } from '../validacoes/Validacoes';

export class Utils {
  static readonly DEFAULT_OPTIONS = {
    suffix: 'BR',
    spaceChar: ' ',
    throwsInvalid: false,
  };

  public static formatarCNPJ(cnpj: any) {
    if (cnpj) {
      return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return cnpj;
  }

  public static formatarDataBr(data: any) {
    return Moment(data).format('DD/MM/YYYY');
  }

  public static formatarDataHoraBr(data: any) {
    return Moment(data).format('DD/MM/YYYY HH:mm');
  }

  public static maskNumeroLO(value: any) {
    let valor = '';
    if (value.length === 10) {
      valor = value.replace('^[a-zA-Z0-9]*$').replace(/^(\d{6})(\d{4})$/, '$1/$2');
    } else {
      valor = value.replace('^[a-zA-Z0-9]*$').replace(/^(\d{5})(\d{4})$/, '$1/$2');
    }
    return valor;
  }

  public static formatarMoedaReal(valor: any, casaDecimal = 2) {
    return valor.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: casaDecimal,
    });
  }

  public static formatarMoedaDolar(valor: any, casaDecimal = 2) {
    return valor.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: casaDecimal,
    });
  }

  public static formartalRealParaNumero(valor: any) {
    let numero = valor.replace('R$', '');
    if (numero === '') {
      numero = 0;
    } else {
      numero = numero.split('.').join('');
      numero = numero.replace(',', '.');
    }
    return numero;
  }

  public static validateTime(params: any) {
    const strRegexHora = /([01][0-9]|2[0-3]):[0-5][0-9]/,
      result = strRegexHora.exec(params);
    if (result) {
      const minutosValidos = result.input;

      if (parseInt(minutosValidos.replace(':', ''), 10) < 30) {
        return false;
      }
      return true;
    }
    return false;
  }

  public static formatDate(strDate: any) {
    if (strDate.split('/')[2]) {
      strDate = strDate.split('/')[2] + '-' + strDate.split('/')[1] + '-' + strDate.split('/')[0];
    }
    return strDate.substr(0, 10);
  }

  public static formatDateStr(strDate: any) {
    if (strDate && strDate !== null) {
      const valueSplit = strDate.split('-');
      const valueSplitDia = valueSplit[2].split(' ');
      strDate = valueSplitDia[0] + '/' + valueSplit[1] + '/' + valueSplit[0];
    }
    return strDate;
  }

  public static isset() {
    const a = arguments;
    const l = a.length;
    let i = 0;

    if (l === 0) {
      throw new Error('Empty isset');
    }

    while (i !== l) {
      if (a[i] === undefined || a[i] === null) {
        return false;
      }
      i++;
    }

    return true;
  }

  public static empty(mixedlet: any) {
    let key;
    let i;
    let len;
    const emptyValues = [undefined, null, false, 0, '', '0'];

    for (i = 0, len = emptyValues.length; i < len; i++) {
      if (mixedlet === emptyValues[i]) {
        return true;
      }
    }

    if (typeof mixedlet === 'object') {
      for (key in mixedlet) {
        if (mixedlet.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  public static aplicarMacaraTeleone(campo: any) {
    campo = campo.replace(/\D/g, '');
    let campoSoNumeros;
    if (campo.length <= 10) {
      campoSoNumeros = campo.replace(/^(\d{2})(\d{4})(\d)/g, '($1) $2-$3');
    } else {
      campoSoNumeros = campo.replace(/^(\d{2})(\d{5})(\d)/g, '($1) $2-$3');
    }
    return campoSoNumeros;
  }

  public static formatarCampo(campo: any, Mascara: any, evento: any) {
    let boleanoMascara,
      posicaoCampo = 0,
      NovoValorCampo = '';
    const campoSoNumeros1 = campo.replace(/\D/g, ''),
      campoSoNumeros = campoSoNumeros1.replace(/(\d{2})(\d)/, '$1:$2');
    let TamanhoMascara = campoSoNumeros.length;

    for (let i = 0; i <= TamanhoMascara; i++) {
      boleanoMascara = Mascara.charAt(i) === '-';
      if (boleanoMascara) {
        NovoValorCampo += Mascara.charAt(i);
        TamanhoMascara++;
      } else {
        NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
        posicaoCampo++;
      }
    }

    evento.target.value = NovoValorCampo;

    return true;
  }

  public static fieldsLength(value: any, length: any) {
    return value.length > length;
  }

  public static formatHours(value: any) {
    if (!this.empty(value)) {
      const valueSplit = value.split(':');
      valueSplit.pop();

      const newValue = valueSplit.join(':');
      return newValue;
    }
  }

  public static formatHoursTempo(value: any) {
    if (!this.empty(value)) {
      const valueSplit = value.split(':');
      const newValue = Math.floor(valueSplit[0]) + 'h ' + Math.floor(valueSplit[1]) + 'min';
      return newValue;
    }
  }

  public static replaceChar(numeric: any, index: any) {
    const chars = numeric.split('');
    const number = chars[index];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    chars[index] = letters[number] || number;
    return chars.join('');
  }

  public static validaCpfCnpj(cpfCnpjCodigo: string): any {
    const tamanho = cpfCnpjCodigo.length;
    if (tamanho < 11 || tamanho > 14) {
      return { success: false, message: Mensagem.MSG_CAMPO_INVALIDO('CPF', 'o') };
    }

    if (tamanho === 11 && !Validacoes.IsCPFValido(cpfCnpjCodigo)) {
      return { success: false, message: Mensagem.MSG_CAMPO_INVALIDO('CPF', 'o') };
    }

    if (tamanho === 14 && !Validacoes.IsCNPJValido(cpfCnpjCodigo)) {
      return { success: false, message: Mensagem.MSG_CAMPO_INVALIDO('CNPJ', 'o') };
    }
    return { success: true };
  }

  public static primeiraLetraCaixaAlta(texto: string) {
    const novoTexto = texto.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
    return novoTexto;
  }
}
