export enum Paises {
  Brasil = 1,
  Argentina = 2,
  Bolivia = 3,
  Colombia = 4,
  Chile = 5,
  Guiana = 6,
  GuianaFrancesa = 7,
  Paraguai = 8,
  Peru = 9,
  Uruguai = 10,
  Venezuela = 11,
}

export class PaisesExt {
  public static GetPaises(): any[] {
    return [
      { name: 'Brasil', value: Paises.Brasil },
      { name: 'Argentina', value: Paises.Argentina },
      { name: 'Bolívia', value: Paises.Bolivia },
      { name: 'Colômbia', value: Paises.Colombia },
      { name: 'Chile', value: Paises.Chile },
      { name: 'Guiana', value: Paises.Guiana },
      { name: 'Guiana Francesa', value: Paises.GuianaFrancesa },
      { name: 'Paraguai', value: Paises.Paraguai },
      { name: 'Peru', value: Paises.Peru },
      { name: 'Uruguai', value: Paises.Uruguai },
      { name: 'Venezuela', value: Paises.Venezuela },
    ];
  }

  public static GetPaisesString(code: any): string {
    let status = this.GetPaises();
    let StatusString = status.filter(function (s) {
      if (s.value === code) {
        return s.name;
      }
    });

    if (StatusString.length) {
      return StatusString[0].name;
    } else {
      return '';
    }
  }
}
