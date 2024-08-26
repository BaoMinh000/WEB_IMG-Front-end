import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice.js";
import userReducer from "../Slice/userSlice.js";
import productReducer from "../Slice/productSlice.js";
export default configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // You can add additional middleware here if needed
});
