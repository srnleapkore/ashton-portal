import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  errorPassUpdate: null,
  errorEmailOtp: null,
  sendEmailOTPLoading: false,
  verifyEmailOTPLoading: false,
  errorVerifyEmailOtp: null,
  updatePasswordLoading: false,
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
      state.updatePasswordLoading = true;
      state.errorPassUpdate = null;
    },
    updatePasswordSuccess: (state, action) => {
      state.updatePasswordLoading = false;
      state.currentUser = action.payload;
      state.errorPassUpdate = null;
    },
    updatePasswordFailure: (state, action) => {
      state.updatePasswordLoading = false;
      state.errorPassUpdate = action.payload;
    },

    sendEmailOTPStart: (state) => {
      state.sendEmailOTPLoading = true;
      state.errorEmailOtp = null;
    },
    sendEmailOTPSuccess: (state) => {
      state.sendEmailOTPLoading = false;
      state.errorEmailOtp = null;
    },
    sendEmailOTPFailure: (state, action) => {
      state.sendEmailOTPLoading = false;
      state.errorEmailOtp = action.payload;
    },

    verifyEmailOTPStart: (state) => {
      state.verifyEmailOTPLoading = true;
      state.errorVerifyEmailOtp = null;
    },
    verifyEmailOTPSuccess: (state) => {
      state.verifyEmailOTPLoading = false;
      state.errorVerifyEmailOtp = null;
    },
    verifyEmailOTPFailure: (state, action) => {
      state.verifyEmailOTPLoading = false;
      state.errorVerifyEmailOtp = action.payload;
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
  sendEmailOTPStart,
  sendEmailOTPSuccess,
  sendEmailOTPFailure,
  verifyEmailOTPStart,
  verifyEmailOTPSuccess,
  verifyEmailOTPFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
