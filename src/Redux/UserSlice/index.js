import { createSlice } from "@reduxjs/toolkit";
import { getImage } from "../ApiRequest";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUser: null,
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        userStart: (state) => {
            state.isFetching = true; // Corrected to state.isFetching
        },
        userSuccess: (state, action) => {
            state.isFetching = false; // Corrected to state.isFetching
            state.allUser = action.payload; // Corrected to state.allUser
            state.error = false;
        },
        userFailure: (state) => {
            state.isFetching = false; // Corrected to state.isFetching
            state.error = true;
        },
        DeleteUserStart: (state) => {
            state.isFetching = true; // Corrected to state.isFetching
        },
        DeleteUserSuccess: (state, action) => {
            state.isFetching = false; // Corrected to state.isFetching
            // state.allUser = action.payload; // Corrected to state.allUser
            state.messages = action.payload.message;
            console.log("Delete user success message:", action.payload.message);
            state.error = false;
        },
        DeleteUserFailure: (state) => {
            state.isFetching = false; // Corrected to state.isFetching
            state.error = true;
        },
        uploadFileStart: (state) => {
            state.isFetching = true;
        },
        uploadFileSuccess: (state, action) => {
            state.isFetching = false;
            state.messages = action.payload.message;
            state.allUser = action.payload;
            console.log("Upload file success message:", action.payload.message);
            state.error = false;
        },
        uploadFileFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        getImageStart: (state) => {
            state.isFetching = true;
        },
        getImageSuccess: (state, action) => {
            state.isFetching = false;
            state.images = action.payload;
            state.error = false;
        },
        getImageFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

    },
});

export const {
    userStart,
    userSuccess,
    userFailure,
    DeleteUserStart,
    DeleteUserSuccess,
    DeleteUserFailure,
    uploadFileStart,
    uploadFileSuccess,
    uploadFileFailure,
    getImageStart,
    getImageSuccess,
    getImageFailure,
} = userSlice.actions;

export default userSlice.reducer;
