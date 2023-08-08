import axios from 'axios';
import Environment from '../../../environments/environment';
import { Interceptors } from './Interceptors';

export const apiUrl = axios.create({
  baseURL: Environment.getUrl(),
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
  },
});

export const scaApi = axios.create({
  baseURL: Environment.getScaUrl(),
});

apiUrl.interceptors.response.use(
  (response) => Interceptors.responseInterceptorSuccess(response),
  (err) => Interceptors.responseInterceptorError(err),
);
