import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utils";
import { TDepartment } from "../../../types";

export const actGetDepartments = createAsyncThunk(
  "departments/actGetDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ data: TDepartment[] }>("/departments");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);