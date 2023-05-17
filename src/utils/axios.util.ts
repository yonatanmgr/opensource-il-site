import axios from 'axios';

//
const BASE_URL = `/api/`;
const axiosInstance = axios.create({
  baseURL: BASE_URL
});

axiosInstance.interceptors.request.use((config) => {
  // const token = LocalStorageService.get(TOKEN_LS_KEY);
  // if (token) {
  //   config.headers = config.headers || {};
  //   (config.headers as any)['Authorization'] = `Bearer ${token}`;
  // }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('🚀 ~ file: HttpService.ts:39 ~ error:', error);
    // if (error.response.status === 401) {
    //   // dispatch the logout action
    //   store.dispatch(logoutAction())
    //   LocalStorageService.delete(TOKEN_LS_KEY)
    //   LocalStorageService.delete(ROLE_LS_KEY)
    //   LocalStorageService.delete(USERNAME_LS_KEY)
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
