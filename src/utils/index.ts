import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

// Configure axios defaults
axios.defaults.baseURL = 'http://77.37.47.148:8000/api/v1';

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