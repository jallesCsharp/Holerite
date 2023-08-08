export class Interceptors {
  public static responseInterceptorSuccess(response: any) {
    return {
      data: response.data,
      success: true,
      msg: '',
    };
  }

  static responseInterceptorError(error: any) {
    return Promise.reject(error.response);
  }
}
