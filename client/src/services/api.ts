import axios, { AxiosError } from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './token';

export const BACKEND_URL = 'http://localhost:5000';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  return api;
};