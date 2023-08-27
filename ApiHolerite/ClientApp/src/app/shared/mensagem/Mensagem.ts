export class Mensagem {
  public static readonly ERROR_501 = '500 Internal Server Error';

  public static readonly ERROR_400 = 'Solicitação Incorreta HTTP 400';

  public static readonly FALHA_REQUISICAO = 'Erro na consulta';

  public static readonly SUCESSO_ALTERACAO = 'Alteração realizado com sucesso!!';

  public static readonly SUCESSO_CADASTRO = 'Cadastro realizado com sucesso!!';

  public static readonly SEM_RESULTADO_EXPORTAR = 'Nenhum resultado encontrado para exportação !';

  public static readonly PARAMETRO_NAO_INFORMADO = 'Sem parametro do para a alteracao';

  public static readonly VERIFICAR_CAMPOS = 'Um ou mais campo são obrigatório faltando';

  public static readonly CPF_INVALIDO = 'CPF invalido';

  public static readonly CNPJ_INVALIDO = 'CNPJ invalido';

  public static readonly EMAIL_INVALIDO = 'Email invalido';

  public static readonly ERRO = 'Erro';

  public static readonly PREENCHA_TODOS_CAMPOS = 'Campo obrigatório faltando';

  public static readonly MSG_A001 = 'Deseja realmente inativar este registro?';

  public static readonly MSG_A002 = 'Deseja realmente concluir o cadastro?';

  public static readonly MSG_A003 = 'Deseja realmente excluir a declaração?';

  public static readonly MSG_A004 = 'Deseja realmente excluir a instalação?';

  public static readonly MSG_S001 = 'Informações inseridas com sucesso!';

  public static readonly MSG_S002 = 'Informações atualizadas com sucesso!';

  public static readonly MSG_S003 = 'Informações inativadas com sucesso!';

  public static readonly MSG_S004 = 'Declaração excluída com sucesso!';

  public static readonly MSG_S005 =
    'Cadastro realizado com sucesso e ponto ativado para solicitação na linha. ';

  public static readonly MSG_S006 =
    'Cadastro realizado com sucesso e enviado para análise da ANTT. ';

  public static readonly MSG_S008 =
    'Cadastro realizado com sucesso e ponto ativado no banco de dados.';

  public static readonly MSG_E003 = 'Nenhum registro encontrado.';

  public static readonly MSG_E004 = 'Data de Emissão invalida.';

  public static readonly MSG_E006 = 'Informe um CEP válido!';

  public static readonly MSG_E007 = 'Erro ao enviar o e-mail.';

  public static readonly MSG_E008 =
    'A empresa selecionada não possui declarações para essa instalação.';

  public static readonly MSG_E009 = 'Erro no cadastramento, favor cadastrar novamente.';

  public static readonly MSG_S007 = (nomeEmpresa: string) =>
    'Cadastro realizado com sucesso e ponto ativado para solicitação na linha da empresa ' +
    nomeEmpresa +
    '.';

  public static readonly MSG_E001 = (nomeCampo: string) =>
    'O campo ' + nomeCampo + ' deve ser preenchido.';

  public static readonly MSG_E002 = (tipoDelaracao: string, tipoInstacao: string) =>
    'É necessário anexar uma Declaração do Tipo ' +
    tipoDelaracao +
    ' para o cadastro de Instalações do Tipo ' +
    tipoInstacao +
    '.';

  public static readonly MSG_E005 = (
    nomeInstacao: string,
    tipoInstacao: string,
    municipioUf: string,
  ) =>
    'O sistema identificou uma ou mais instalações já ' +
    'cadastradas em um raio de 5Km. \n São elas:\n ' +
    nomeInstacao +
    ' – ' +
    tipoInstacao +
    ' – ' +
    municipioUf;

  public static readonly MSG_CAMPO_INVALIDO = (
    variavelPrincipal: string,
    generoDaVariavel: string,
  ) => variavelPrincipal + ' inválido' + generoDaVariavel + '!';
}
