import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utils";
import { TProduct } from "../../../types";

interface ICreateProductData {
  name: string;
  description: string;
  images: File[];
  categoryId: string;
}

export const actCreateProduct = createAsyncThunk(
  "products/actCreateProduct",
  async (data: ICreateProductData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('category', data.categoryId);
      
      data.images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await axios.post<TProduct>('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);