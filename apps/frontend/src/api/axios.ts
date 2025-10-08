import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }

    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      'Request failed';
    return Promise.reject(new Error(message));
  },
);

export default api;
