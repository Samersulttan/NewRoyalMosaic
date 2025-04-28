import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { axiosErrorHandler } from '../../utils';

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!Cookies.get('token'),
  token: Cookies.get('token') || null,
  loading: 'idle',
  error: null
};

export const actLogin = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', credentials);
      const { token } = response.data;
      
      // Set token in cookie
      Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
      
      // Set token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return token;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export const actLogout = createAsyncThunk(
  'auth/logout',
  async () => {
    // Remove token from cookie
    Cookies.remove('token');
    
    // Remove token from axios headers
    delete axios.defaults.headers.common['Authorization'];
    
    return null;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actLogin.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(actLogin.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.isAuthenticated = true;
        state.token = action.payload;
      })
      .addCase(actLogin.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      .addCase(actLogout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
      });
  }
});

export default authSlice.reducer;