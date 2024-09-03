import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/authSlice.js";
import userReducer from "../Slice/userSlice.js";
import productReducer from "../Slice/productSlice.js";
import planReducer from "../Slice/PlanSlice.js";
export default configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: productReducer,
        plan: planReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // You can add additional middleware here if needed
});
