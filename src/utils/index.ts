import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

// Configure axios defaults
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://api.royalmosaic.ae/api/v1';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

// Add token to headers if it exists
const token = Cookies.get('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const axiosErrorHandler = (error: unknown): string => {
  if (error instanceof AxiosError) {
    // Handle API error messages
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    // Handle network errors
    if (error.code === 'ERR_NETWORK') {
      return 'لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك.';
    }
    return error.message;
  }
  return 'حدث خطأ غير متوقع';
};
