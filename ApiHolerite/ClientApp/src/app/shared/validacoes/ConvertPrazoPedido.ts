import Moment from 'moment';

export class ConvertPrazoPedido {
  public static GetStatusByPrazo(prazo: any) {
    let hoje = Moment(new Date(), 'DD/MM/YYYY');
    let vencimentoDias = this.workdayCount(hoje, Moment(prazo, 'DD/MM/YYYY'));
    if (vencimentoDias > 2) {
      return 'Green';
    }
    if (vencimentoDias > 0) {
      return 'Yellow';
    }
    if (vencimentoDias === 0) {
      return 'Red';
    }
  }

  public static workdayCount(start: Date | any, end: Date | any) {
    var dataInicial = Moment(start, 'DD/MM/YYYY');
    var prazoFinal = Moment(end, 'DD/MM/YYYY');
    var diasContados = 0;

    while (dataInicial.isSameOrBefore(prazoFinal)) {
      if (dataInicial.isSame(prazoFinal)) {
        diasContados++;
        dataInicial.add(1, 'days');
      } else if (dataInicial.weekday() === 5) {
        diasContados++;
        dataInicial.add(3, 'days');
      } else {
        diasContados++;
        dataInicial.add(1, 'days');
      }
    }
    return diasContados;
  }

  public static addWorkDays(dias: number, data: Date | any) {
    var novaData = Moment(data);
    var diasUteisRemanescente = dias;

    while (diasUteisRemanescente !== 0) {
      if (novaData.weekday() === 5) {
        novaData = novaData.add(3, 'days');
      } else {
        novaData = novaData.add(1, 'days');
      }
      diasUteisRemanescente--;
    }
    return novaData.format('DD/MM/YYYY');
  }
}
