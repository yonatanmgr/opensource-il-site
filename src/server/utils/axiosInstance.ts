import axios from 'axios';
import { logger } from './logger';

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config) => {
  logger.info('Request sent', config);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    logger.info('🚀 ~ file: axiosInstance.tsx:14 ~ response:', response);
    return response;
  },
  (error) => {
    logger.error('🚀 ~ file: axiosInstance.tsx:17 ~ error:', error);
    return Promise.reject(error);
  }
);
