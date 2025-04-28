import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utils";

export const actDeleteProduct = createAsyncThunk(
  "products/actDeleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);