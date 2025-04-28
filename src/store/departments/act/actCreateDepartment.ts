import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utils";
import { TDepartment } from "../../../types";

interface ICreateDepartmentData {
  title: string;
  subtitle: string;
  description: string;
  path: string;
  image: File;
}

export const actCreateDepartment = createAsyncThunk(
  "departments/actCreateDepartment",
  async (data: ICreateDepartmentData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('subtitle', data.subtitle);
      formData.append('description', data.description);
      formData.append('path', data.path);
      formData.append('image', data.image);

      const response = await axios.post<{ data: TDepartment }>('/departments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);