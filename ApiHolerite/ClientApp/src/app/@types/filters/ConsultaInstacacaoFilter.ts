export class ConsultaInstacacaoFilter {
  nomeEmpresa?: string | null;

  cnpjEmpresa?: string | null;

  nomeInstalacao?: string | null;

  idTipoInstalacao?: number;

  situacaoInstalacao?: string | null;

  situacao?: number | null;

  idPais?: number | null;

  idUF?: number | null;

  idMunicipio?: number | null;

  cep?: string | null;

  public constructor(init?: Partial<ConsultaInstacacaoFilter>) {
    Object.assign(this, init);
  }
}
