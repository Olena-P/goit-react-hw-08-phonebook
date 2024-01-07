import { createSlice } from '@reduxjs/toolkit';
import { signup, login, logout, getCurrentUser } from './operations';

const initialState = {
  user: { name: null, email: null },
  token: localStorage.getItem('authToken') || null,
  isLoggedIn: Boolean(localStorage.getItem('authToken')),
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem('authToken');
      })
      .addCase(getCurrentUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(getCurrentUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
