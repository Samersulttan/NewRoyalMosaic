import { createSlice } from "@reduxjs/toolkit";
import { actGetProducts } from "./act/actGetProducts";
import { actCreateProduct } from "./act/actCreateProduct";
import { actDeleteProduct } from "./act/actDeleteProduct";
import { actGetCategoryProducts } from "./act/actGetCategoryProducts";
import { TProduct, TLoading, isString } from "../../types";

interface IProductsState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
  createStatus: TLoading;
  createError: string | null;
  deleteStatus: TLoading;
  deleteError: string | null;
  categoryProducts: {
    records: TProduct[];
    loading: TLoading;
    error: string | null;
  };
}

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
  createStatus: "idle",
  createError: null,
  deleteStatus: "idle",
  deleteError: null,
  categoryProducts: {
    records: [],
    loading: "idle",
    error: null,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsRecordsCleanUp: (state) => {
      state.records = [];
    },
    resetProductCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = null;
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = "idle";
      state.deleteError = null;
    },
    categoryProductsCleanUp: (state) => {
      state.categoryProducts.records = [];
      state.categoryProducts.loading = "idle";
      state.categoryProducts.error = null;
    },
  },
  extraReducers: (builder) => {
    // Get Products
    builder.addCase(actGetProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Create Product
    builder.addCase(actCreateProduct.pending, (state) => {
      state.createStatus = "pending";
      state.createError = null;
    });
    builder.addCase(actCreateProduct.fulfilled, (state, action) => {
      state.createStatus = "succeeded";
      state.records = [...state.records, action.payload];
    });
    builder.addCase(actCreateProduct.rejected, (state, action) => {
      state.createStatus = "failed";
      if (isString(action.payload)) {
        state.createError = action.payload;
      }
    });

    // Delete Product
    builder.addCase(actDeleteProduct.pending, (state) => {
      state.deleteStatus = "pending";
      state.deleteError = null;
    });
    builder.addCase(actDeleteProduct.fulfilled, (state, action) => {
      state.deleteStatus = "succeeded";
      state.records = state.records.filter(
        (product) => product._id !== action.payload
      );
    });
    builder.addCase(actDeleteProduct.rejected, (state, action) => {
      state.deleteStatus = "failed";
      if (isString(action.payload)) {
        state.deleteError = action.payload;
      }
    });

    // Get Category Products
    builder.addCase(actGetCategoryProducts.pending, (state) => {
      state.categoryProducts.loading = "pending";
      state.categoryProducts.error = null;
    });
    builder.addCase(actGetCategoryProducts.fulfilled, (state, action) => {
      state.categoryProducts.loading = "succeeded";
      state.categoryProducts.records = action.payload;
    });
    builder.addCase(actGetCategoryProducts.rejected, (state, action) => {
      state.categoryProducts.loading = "failed";
      if (isString(action.payload)) {
        state.categoryProducts.error = action.payload;
      }
    });
  },
});

export { 
  actGetProducts, 
  actCreateProduct, 
  actDeleteProduct,
  actGetCategoryProducts 
};

export const { 
  productsRecordsCleanUp, 
  resetProductCreateStatus, 
  resetDeleteStatus,
  categoryProductsCleanUp 
} = productsSlice.actions;

export default productsSlice.reducer;