import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: "https://api.croplink.org/api/",
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
      const accessToken = Cookies.get('access'); // Retrieve access token from cookies

      if (accessToken) {
        // If access token exists, add it to the request headers
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      // Do something with request error
      return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Check if the error is related to token expiration or invalid token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = Cookies.get('refresh');

          if (!refreshToken) {
            // No refresh token, redirect to login
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
            return Promise.reject(error);
          }

          const response = await axios.post(
              `https://api.croplink.org/api/auth/jwt/refresh/`,
              { refresh: refreshToken }
          );

          const newToken = response.data.access;
          Cookies.set('access', newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Handle error while refreshing token
          // Clear tokens and redirect to login
          Cookies.remove('access');
          Cookies.remove('refresh');

          return Promise.reject(refreshError);
        }
      }

      // If the error is not related to token expiration or invalid token, return the error
      return Promise.reject(error);
    }
);

export default instance;