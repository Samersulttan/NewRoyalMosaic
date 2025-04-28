import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosErrorHandler } from '../../utils';

interface CatalogFormData {
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}

interface CatalogRequest extends CatalogFormData {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface CatalogState {
  records: CatalogRequest[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CatalogState = {
  records: [],
  loading: 'idle',
  error: null
};

export const actSubmitCatalogForm = createAsyncThunk(
  'catalog/submit',
  async (data: CatalogFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/catalog-requests', data, {
        responseType: 'arraybuffer'
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export const actGetCatalogRequests = createAsyncThunk(
  'catalog/getRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ data: CatalogRequest[] }>('/catalog-requests');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Submit Form
      .addCase(actSubmitCatalogForm.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(actSubmitCatalogForm.fulfilled, (state) => {
        state.loading = 'succeeded';
      })
      .addCase(actSubmitCatalogForm.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      })
      
      // Get Requests
      .addCase(actGetCatalogRequests.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(actGetCatalogRequests.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.records = action.payload;
      })
      .addCase(actGetCatalogRequests.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { resetStatus } = catalogSlice.actions;
export default catalogSlice.reducer;