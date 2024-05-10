import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice/index.js";
import userReducer from "../UserSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // You can add additional middleware here if needed
});
