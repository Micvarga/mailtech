import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../features/Users/userSlice";
import { authApi } from "./Services/authServices";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});
