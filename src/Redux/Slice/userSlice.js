import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    isFetching: false,
    error: false,
    userDetails: null,
  },
  reducers: {
    // Action to start getting users
    usersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    // Action to handle successful retrieval of users
    usersSuccess: (state, action) => {
      state.isFetching = false;
      state.allUsers = action.payload;
      state.error = false;
    },
    // Action to handle failed retrieval of users
    usersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Action to start getting user details
    userDetailsStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    // Action to handle successful retrieval of user details
    userDetailsSuccess: (state, action) => {
      state.isFetching = false;
      state.userDetails = action.payload;
      state.error = false;
    },
    // Action to handle failed retrieval of user details
    userDetailsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Action to start deleting a user
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    // Action to handle successful deletion of a user
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.allUsers = state.allUsers.filter(
        (user) => user.id !== action.payload
      );
      state.error = false;
    },
    // Action to handle failed deletion of a user
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Action to start creating a user
    createUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    // Action to handle successful creation of a user
    createUserSuccess: (state, action) => {
      state.isFetching = false;
      state.allUsers = [...state.allUsers, action.payload];
      state.error = false;
    },
    // Action to handle failed creation of a user
    createUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Action to start updating a user
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    // Action to handle successful user update
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      // Update the user details
      state.userDetails = action.payload;
      // Update the user in allUsers if needed
      state.allUsers = state.allUsers.map(user =>
        user.id === action.payload.id ? action.payload : user
      );
      state.error = false;
    },
    // Action to handle failed user update
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

// Export the actions
export const {
  usersStart,usersSuccess,usersFailure,

  userDetailsStart,userDetailsSuccess,userDetailsFailure,

  deleteUserStart,deleteUserSuccess,deleteUserFailure,
  
  createUserStart,createUserSuccess,createUserFailure,

  updateUserStart,updateUserSuccess,updateUserFailure,

  addUserStart, addUserSuccess, addUserFailure
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
