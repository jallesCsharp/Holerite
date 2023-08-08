export interface TResponse<T> {
  success: boolean;
  data: T | null;
  errors: any | null;
}
