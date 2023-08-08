export default class Environment {
  private static env = process.env.REACT_APP_ENV;

  private static url = process.env.REACT_APP_API_URL;

  private static sigma_url = process.env.REACT_APP_SIGMA_URL;

  private static sca_url = process.env.REACT_APP_SCA_URL!;

  private static sca_client_id = process.env.REACT_APP_SCA_CLIENT_ID!;

  private static sca_pwd = process.env.REACT_APP_PWD!;

  private static sca_client_auth_scope = process.env.REACT_APP_SCA_CLIENT_AUTH_SCOPE!;

  private static sca_redirect_url = Environment.sigma_url + '/login/sca';

  private static login_unico_url = process.env.REACT_APP_LOGIN_UNICO_URL;

  private static login_unico_redirect_url = Environment.sigma_url + '/login/unico';

  private static login_unico_client_id = process.env.REACT_APP_LOGIN_UNICO_CLIENT_ID;

  private static login_unico_client_auth_scope =
    process.env.REACT_APP_LOGIN_UNICO_CLIENT_AUTH_SCOPE;

  private static login_unico_user_confiabilidade_validas =
    process.env.REACT_APP_LOGIN_UNICO_USER_CONFIABILIDADES_VALIDAS!;

  public static getEnv() {
    return this.env;
  }

  public static getUrl() {
    return this.url;
  }

  public static getScaUrl() {
    return this.sca_url;
  }

  public static getScaClientId() {
    return this.sca_client_id;
  }

  public static getScaPwd() {
    return this.sca_pwd;
  }

  public static getScaClientAuthScope() {
    return this.sca_client_auth_scope;
  }

  public static getSigmaUrl() {
    return this.sigma_url;
  }

  public static getLoginUnicoUrl() {
    return this.login_unico_url;
  }

  public static getLoginUnicoClientId() {
    return this.login_unico_client_id;
  }

  public static getLoginUnicoClientAuthScope() {
    return this.login_unico_client_auth_scope;
  }

  public static getLoginUnicoUserConfiabilidadeValidas() {
    return this.login_unico_user_confiabilidade_validas;
  }

  public static getScaRedirectUrl() {
    return this.sca_redirect_url;
  }

  public static getLoginUnicoRedirectUrl() {
    return this.login_unico_redirect_url;
  }
}
