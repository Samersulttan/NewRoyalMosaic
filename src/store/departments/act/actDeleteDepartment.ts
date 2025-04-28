import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandler } from "../../../utils";

export const actDeleteDepartment = createAsyncThunk(
  "departments/actDeleteDepartment",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/departments/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);