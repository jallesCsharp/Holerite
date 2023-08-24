export enum Mes {
  Todos = 0,
  Janeiro = 1,
  Fevereiro = 2,
  Março = 3,
  Abril = 4,
  Maio = 5,
  Junho = 6,
  Julho = 7,
  Agosto = 8,
  Setembro = 9,
  Outubro = 10,
  Novembro = 11,
  Dezembro = 12,
}

export class MesExt {
  public static GetMes(): any[] {
    return [
      { name: 'Todos', id: Mes.Todos },
      { name: 'Janeiro', id: Mes.Janeiro },
      { name: 'Fevereiro', id: Mes.Fevereiro },
      { name: 'Março', id: Mes.Março },
      { name: 'Abril', id: Mes.Abril },
      { name: 'Maio', id: Mes.Maio },
      { name: 'Junho', id: Mes.Junho },
      { name: 'Julho', id: Mes.Julho },
      { name: 'Agosto', id: Mes.Agosto },
      { name: 'Setembro', id: Mes.Setembro },
      { name: 'Outubro', id: Mes.Outubro },
      { name: 'Novembro', id: Mes.Novembro },
      { name: 'Dezembro', id: Mes.Dezembro },
    ];
  }

  public static GetMesString(code: any): string {
    let status = this.GetMes();
    let StatusString = status.filter(function (s) {
      if (s.id === code) {
        console.log('s');
        console.log(s);
        return s;
      }
    });

    if (StatusString.length) {
      return StatusString[0].name;
    } else {
      return '';
    }
  }
}
