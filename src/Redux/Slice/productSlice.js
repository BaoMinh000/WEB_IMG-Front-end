import { createSlice } from "@reduxjs/toolkit";
import Search from "antd/es/transfer/search";

const productSlice = createSlice({
    name: "product",
    initialState: {
        get_product:{
            data:{},
            isFetching: false,
            error: false,
        },
        products: {
            list: [],
            isFetching: false,
            error: false,
        },
        addProduct: {
            isFetching: false,
            error: false,
            success: false,
        },
        updateProduct: {
            isFetching: false,
            error: false,
            success: false,
        },
        deleteProduct: {
            isFetching: false,
            error: false,
            success: false,
        },
        Search: {
            SearchValue: "",
        }
    },
    reducers: {
        getproductIdStart: (state) => {
            state.get_product.isFetching = true;
            state.get_product.error = false;
        },
        getproductIdSuccess: (state, action) => {
            state.get_product.isFetching = false;
            state.get_product.data = action.payload;
            state.get_product.error = false;
        },
        getproductIdFailure: (state) => {
            state.get_product.isFetching = false;
            state.get_product.error = true;
        },

        // Actions for fetching products
        fetchProductsStart: (state) => {
            state.products.isFetching = true;
            state.products.error = false;
        },
        fetchProductsSuccess: (state, action) => {
            state.products.isFetching = false;
            state.products.list = action.payload;
            state.products.error = false;
        },
        fetchProductsFailure: (state) => {
            state.products.isFetching = false;
            state.products.error = true;
        },

        // Actions for adding a product
        addProductStart: (state) => {
            state.addProduct.isFetching = true;
            state.addProduct.error = false;
            state.addProduct.success = false;
        },
        addProductSuccess: (state, action) => {
            state.addProduct.isFetching = false;
            state.addProduct.success = true;
            state.products.list.push(action.payload);
            state.addProduct.error = false;
        },
        addProductFailure: (state) => {
            state.addProduct.isFetching = false;
            state.addProduct.error = true;
            state.addProduct.success = false;
        },

        // Actions for updating a product
        updateProductStart: (state) => {
            state.updateProduct.isFetching = true;
            state.updateProduct.error = false;
            state.updateProduct.success = false;
        },
        updateProductSuccess: (state, action) => {
            state.updateProduct.isFetching = false;
            state.updateProduct.success = true;
            const index = state.products.list.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.products.list[index] = action.payload;
            }
            state.updateProduct.error = false;
        },
        updateProductFailure: (state) => {
            state.updateProduct.isFetching = false;
            state.updateProduct.error = true;
            state.updateProduct.success = false;
        },

        // Actions for deleting a product
        deleteProductStart: (state) => {
            state.deleteProduct.isFetching = true;
            state.deleteProduct.error = false;
            state.deleteProduct.success = false;
        },
        deleteProductSuccess: (state, action) => {
            state.deleteProduct.isFetching = false;
            state.deleteProduct.success = true;
            state.deleteProduct.error = false;
        },
        deleteProductFailure: (state) => {
            state.deleteProduct.isFetching = false;
            state.deleteProduct.error = true;
            state.deleteProduct.success = false;
        },

        // Action for searching products
        searchProduct: (state, action) => {
            state.Search.SearchValue = action.payload;
        },

        // Action for clearing the search value
        clearSearchValue: (state) => {
            state.Search.SearchValue = "";
        },
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    searchProduct,
    clearSearchValue, // export the clearSearchValue action
    getproductIdStart,
    getproductIdSuccess,
    getproductIdFailure,
} = productSlice.actions;

export default productSlice.reducer;
