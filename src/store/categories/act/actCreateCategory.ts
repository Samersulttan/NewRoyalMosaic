import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utils";
import { TCategory } from "../../../types";

interface ICreateCategoryData {
  name: string;
  description: string;
  mainImage: File;
  departmentId: string;
}

export const actCreateCategory = createAsyncThunk(
  "categories/actCreateCategory",
  async (data: ICreateCategoryData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('mainImage', data.mainImage);
      formData.append('department', data.departmentId);

      const response = await axios.post<TCategory>('/categories', formData, {
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