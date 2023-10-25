import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    signInError: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const { signInError, signInStart, signInSuccess } = userSlice.actions;

export default userSlice.reducer;
