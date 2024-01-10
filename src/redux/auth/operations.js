import { createAsyncThunk } from '@reduxjs/toolkit';

const setAuthHeader = token => {
  const headers = new Headers();
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  return headers;
};

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(
        'https://connections-api.herokuapp.com/users/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(
        'https://connections-api.herokuapp.com/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await fetch('https://connections-api.herokuapp.com/users/logout', {
      method: 'POST',
      headers: setAuthHeader(localStorage.getItem('authToken')),
    });
    localStorage.removeItem('authToken');
    return {};
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getCurrentUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const response = await fetch(
        'https://connections-api.herokuapp.com/users/current',
        {
          method: 'GET',
          headers: setAuthHeader(persistedToken),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
