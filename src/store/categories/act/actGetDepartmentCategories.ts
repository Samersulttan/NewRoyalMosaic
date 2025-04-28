import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utils";
import { TCategory } from "../../../types";

export const actGetDepartmentCategories = createAsyncThunk(
  "categories/actGetDepartmentCategories",
  async (departmentId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ data: TCategory[] }>(`/categories?department=${departmentId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);