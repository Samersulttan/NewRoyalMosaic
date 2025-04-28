import { createSlice } from "@reduxjs/toolkit";
import { actGetCategories } from "./act/actGetCategories";
import { actCreateCategory } from "./act/actCreateCategory";
import { actDeleteCategory } from "./act/actDeleteCategory";
import { actGetDepartmentCategories } from "./act/actGetDepartmentCategories";
import { TCategory, TLoading, isString } from "../../types";

interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
  createStatus: TLoading;
  createError: string | null;
  deleteStatus: TLoading;
  deleteError: string | null;
  departmentCategories: {
    records: TCategory[];
    loading: TLoading;
    error: string | null;
  };
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
  createStatus: "idle",
  createError: null,
  deleteStatus: "idle",
  deleteError: null,
  departmentCategories: {
    records: [],
    loading: "idle",
    error: null,
  },
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesRecordsCleanUp: (state) => {
      state.records = [];
    },
    resetCategoryCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = null;
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = "idle";
      state.deleteError = null;
    },
    departmentCategoriesCleanUp: (state) => {
      state.departmentCategories.records = [];
      state.departmentCategories.loading = "idle";
      state.departmentCategories.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Categories
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Create Category
    builder.addCase(actCreateCategory.pending, (state) => {
      state.createStatus = "pending";
      state.createError = null;
    });
    builder.addCase(actCreateCategory.fulfilled, (state, action) => {
      state.createStatus = "succeeded";
      state.records = [...state.records, action.payload];
    });
    builder.addCase(actCreateCategory.rejected, (state, action) => {
      state.createStatus = "failed";
      if (isString(action.payload)) {
        state.createError = action.payload;
      }
    });

    // Delete Category
    builder.addCase(actDeleteCategory.pending, (state) => {
      state.deleteStatus = "pending";
      state.deleteError = null;
    });
    builder.addCase(actDeleteCategory.fulfilled, (state, action) => {
      state.deleteStatus = "succeeded";
      state.records = state.records.filter(
        (category) => category._id !== action.payload
      );
    });
    builder.addCase(actDeleteCategory.rejected, (state, action) => {
      state.deleteStatus = "failed";
      if (isString(action.payload)) {
        state.deleteError = action.payload;
      }
    });

    // Get Department Categories
    builder.addCase(actGetDepartmentCategories.pending, (state) => {
      state.departmentCategories.loading = "pending";
      state.departmentCategories.error = null;
    });
    builder.addCase(actGetDepartmentCategories.fulfilled, (state, action) => {
      state.departmentCategories.loading = "succeeded";
      state.departmentCategories.records = action.payload;
    });
    builder.addCase(actGetDepartmentCategories.rejected, (state, action) => {
      state.departmentCategories.loading = "failed";
      if (isString(action.payload)) {
        state.departmentCategories.error = action.payload;
      }
    });
  },
});

export { 
  actGetCategories, 
  actCreateCategory, 
  actDeleteCategory, 
  actGetDepartmentCategories 
};

export const { 
  categoriesRecordsCleanUp, 
  resetCategoryCreateStatus, 
  resetDeleteStatus,
  departmentCategoriesCleanUp 
} = categoriesSlice.actions;

export default categoriesSlice.reducer;