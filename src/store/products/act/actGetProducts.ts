import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utils";
import { TProduct } from "../../../types";

export const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ data: TProduct[] }>("/products");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);