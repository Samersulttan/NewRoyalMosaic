import { configureStore } from "@reduxjs/toolkit";
import departments from "./departments/departmentsSlice";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import auth from "./auth/authSlice";
import catalog from "./catalog/catalogSlice";

const store = configureStore({
  reducer: {
    departments,
    categories,
    products,
    auth,
    catalog
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };