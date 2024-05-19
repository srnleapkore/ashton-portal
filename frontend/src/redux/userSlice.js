import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  errorPassUpdate: null,
  signUpData: null,
  resendbuttonloading: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpSuccess: (state, action) => {
      state.signUpData = action.payload;
    },
    resendVerifyStart: (state) => {
      state.resendbuttonloading = true;
    },
    resendVerifySucces: (state) => {
      state.resendbuttonloading = false;
    },
    resendVerifyFailure: (state) => {
      state.resendbuttonloading = false;
    },
    clearError: (state) => {
      state.error = null;
      state.loading = false;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordStart: (state) => {
      state.loading = true;
      state.errorPassUpdate = null;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.errorPassUpdate = null;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.errorPassUpdate = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpSuccess,
  resendVerifyStart,
  resendVerifySucces,
  resendVerifyFailure,
  clearError,
  updateStart,
  updateSuccess,
  updateFailure,
  updatePasswordSuccess,
  updatePasswordStart,
  updatePasswordFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
