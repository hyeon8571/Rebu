import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  emailVeri: "",
  password: "",
  passwordVeri: "",
  emailMsg: "",
  isEmailValid: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setEmailVeri: (state, action) => {
      state.emailVeri = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordVeri: (state, action) => {
      state.passwordVeri = action.payload;
    },
    setEmailMsg: (state, action) => {
      state.emailMsg = action.payload;
    },
    setIsEmailValid: (state, action) => {
      state.isEmailValid = action.payload;
    },
  },
});

export const {
  setEmail,
  setEmailVeri,
  setPassword,
  setPasswordVeri,
  setEmailMsg,
  setIsEmailValid,
} = signupSlice.actions;

export default signupSlice.reducer;
