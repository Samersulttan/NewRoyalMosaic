import { createSlice } from "@reduxjs/toolkit";
import { actCreateDepartment } from "./act/actCreateDepartment";
import { actGetDepartments } from "./act/actGetDepartments";
import { actDeleteDepartment } from "./act/actDeleteDepartment";
import { TDepartment, TLoading, isString } from "../../types";

interface IDepartmentsState {
  records: TDepartment[];
  loading: TLoading;
  error: string | null;
  createStatus: TLoading;
  createError: string | null;
  deleteStatus: TLoading;
  deleteError: string | null;
}

const initialState: IDepartmentsState = {
  records: [],
  loading: "idle",
  error: null,
  createStatus: "idle",
  createError: null,
  deleteStatus: "idle",
  deleteError: null,
};

const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = null;
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = "idle";
      state.deleteError = null;
    },
    departmentsRecordsCleanUp: (state) => {
      state.records = [];
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Departments
    builder.addCase(actGetDepartments.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetDepartments.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
      state.error = null;
    });
    builder.addCase(actGetDepartments.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Create Department
    builder.addCase(actCreateDepartment.pending, (state) => {
      state.createStatus = "pending";
      state.createError = null;
    });
    builder.addCase(actCreateDepartment.fulfilled, (state, action) => {
      state.createStatus = "succeeded";
      state.records.push(action.payload);
    });
    builder.addCase(actCreateDepartment.rejected, (state, action) => {
      state.createStatus = "failed";
      if (isString(action.payload)) {
        state.createError = action.payload;
      }
    });

    // Delete Department
    builder.addCase(actDeleteDepartment.pending, (state) => {
      state.deleteStatus = "pending";
      state.deleteError = null;
    });
    builder.addCase(actDeleteDepartment.fulfilled, (state, action) => {
      state.deleteStatus = "succeeded";
      state.records = state.records.filter(
        (department) => department._id !== action.payload
      );
    });
    builder.addCase(actDeleteDepartment.rejected, (state, action) => {
      state.deleteStatus = "failed";
      if (isString(action.payload)) {
        state.deleteError = action.payload;
      }
    });
  },
});

export { actCreateDepartment, actGetDepartments, actDeleteDepartment };
export const { resetCreateStatus, resetDeleteStatus, departmentsRecordsCleanUp } = departmentsSlice.actions;
export default departmentsSlice.reducer;