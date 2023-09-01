import axios from 'axios';
import Environment from '../../../environments/environment';
import { Interceptors } from './Interceptors';

export const apiUrl = axios.create({
  baseURL: Environment.getUrl(),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    Authorization: `Bearer ${Environment.getJwt() === undefined ? '' : Environment.getJwt()}`,
  },
});

apiUrl.interceptors.response.use(
  (response) => Interceptors.responseInterceptorSuccess(response),
  (err) => Interceptors.responseInterceptorError(err),
);
