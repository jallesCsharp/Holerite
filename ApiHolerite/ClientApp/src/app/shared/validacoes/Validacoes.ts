export class Validacoes {
  public static validaEmail(email: string) {
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

    return regex.test(email);
  }

  public static IsCPFValido(cpf: string): boolean {
    if (cpf === null) {
      return false;
    }
    if (cpf.length !== 11) {
      return false;
    }
    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false;
    }
    let numero = 0;
    let caracter = '';
    const numeros = '0123456789';
    let j = 10;
    let somatorio = 0;
    let resto = 0;
    let digito1 = 0;
    let digito2 = 0;
    let cpfAux = '';
    cpfAux = cpf.substring(0, 9);
    for (let i = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) === -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + numero * j;
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf !== cpfAux) {
      return false;
    } else {
      return true;
    }
  }

  public static digit(numbers: any): number {
    let index = 2;

    const sum = [...numbers].reverse().reduce((buffer, number) => {
      buffer += Number(number) * index;
      index = index === 9 ? 2 : index + 1;
      return buffer;
    }, 0);

    const mod = sum % 11;

    return mod < 2 ? 0 : 11 - mod;
  }

  public static IsCNPJValido(cnpj: string | number): boolean {
    const cleaned = cnpj.toString().replace(/[\.\/\-]/g, '');

    if (!cleaned || cleaned.length !== 14 || /^(\d)\1+$/.test(cleaned)) {
      return false;
    }

    let registration = cleaned.substr(0, 12);
    registration += this.digit(registration);
    registration += this.digit(registration);

    return registration.substr(-2) === cleaned.substr(-2);
    // return true;
  }

  public static in_array(needle: any, haystack: any, argStrict: any) {
    let key = '';
    const strict = !!argStrict;

    if (strict) {
      for (key in haystack) {
        if (haystack[key] === needle) {
          return true;
        }
      }
    } else {
      for (key in haystack) {
        if (haystack[key] === needle) {
          // eslint-disable-line eqeqeq
          return true;
        }
      }
    }

    return false;
  }

  public IsCPF(strCPF: any) {
    if (strCPF) {
      strCPF = strCPF.replace('.', '');
      strCPF = strCPF.replace('-', '');

      if (strCPF.length > 11) {
        return false;
      }
      if (strCPF === '00000000000') {
        return false;
      }
      if (strCPF === '11111111111') {
        return false;
      }

      const cpfArray = Array.from(strCPF);
      const peso = [10, 9, 8, 7, 6, 5, 4, 3, 2];
      const pesoVerificacao1 = [];
      let peso1 = 0;
      // tslint:disable-next-line:radix
      const dv1 = parseInt(cpfArray[9] as string);
      const pesoVerificacao2 = [];
      let peso2 = 0;
      // tslint:disable-next-line:radix
      const dv2 = parseInt(cpfArray[10] as string);

      cpfArray.pop();
      cpfArray.pop();

      for (let index = 0; index < cpfArray.length; index++) {
        // tslint:disable-next-line:radix
        const element = parseInt(cpfArray[index] as string);
        pesoVerificacao1.push(element * peso[index]);
      }

      pesoVerificacao1.forEach((a) => {
        peso1 = peso1 + a;
      });

      const pdv1 = 11 - (peso1 % 11);

      if (pdv1 === dv1) {
        cpfArray.push(dv1.toString());
        peso.splice(0, 0, 11);
      } else {
        return false;
      }

      for (let index = 0; index < cpfArray.length; index++) {
        // tslint:disable-next-line:radix
        const element = parseInt(cpfArray[index] as string);
        pesoVerificacao2.push(element * peso[index]);
      }

      pesoVerificacao2.forEach((a) => {
        peso2 = peso2 + a;
      });

      const pdv2 = 11 - (peso2 % 11);

      if (pdv2 === dv2) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }

  public validarCNPJ(valor: any) {
    if (valor) {
      const cnpj = valor.replace(/[^\d]+/g, '');

      if (cnpj.length !== 14) {
        return false;
      }

      if (/^(\d)\1+$/.test(cnpj)) {
        return false;
      }

      const t = cnpj.length - 2,
        d = cnpj.substring(t),
        // tslint:disable-next-line:radix
        d1 = parseInt(d.charAt(0)),
        // tslint:disable-next-line:radix
        d2 = parseInt(d.charAt(1)),
        calc = (x: any) => {
          // tslint:disable-next-line:prefer-const
          let n = cnpj.substring(0, x),
            y = x - 7,
            s = 0,
            r = 0;

          for (let i = x; i >= 1; i--) {
            s += n.charAt(x - i) * y--;
            if (y < 2) {
              y = 9;
            }
          }

          r = 11 - (s % 11);
          return r > 9 ? 0 : r;
        };

      return calc(t) === d1 && calc(t + 1) === d2;
    }
    return false;
  }
}
