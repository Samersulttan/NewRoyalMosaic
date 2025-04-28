import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utils";
import { TProduct } from "../../../types";

export const actGetCategoryProducts = createAsyncThunk(
  "products/actGetCategoryProducts",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ data: TProduct[] }>(`/products?category=${categoryId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);