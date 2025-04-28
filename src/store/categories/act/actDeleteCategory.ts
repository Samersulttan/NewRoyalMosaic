import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utils";

export const actDeleteCategory = createAsyncThunk(
  "categories/actDeleteCategory",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/categories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);