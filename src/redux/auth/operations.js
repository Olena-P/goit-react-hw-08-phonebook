import { createAsyncThunk } from '@reduxjs/toolkit';
// Utility to add JWT
const setAuthHeader = token => {
  const headers = new Headers();
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  return headers;
};

// Utility to remove JWT
const clearAuthHeader = () => new Headers();

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
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
      setAuthHeader(data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch(
        'https://connections-api.herokuapp.com/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...setAuthHeader(localStorage.getItem('authToken')),
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message);
      }

      const data = await response.json();
      const token = data.token;

      if (token) {
        localStorage.setItem('authToken', token);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await fetch('https://connections-api.herokuapp.com/users/logout', {
      method: 'POST',
      headers: clearAuthHeader(),
    });
    // After a successful logout, remove the token from the HTTP header
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      const response = await fetch(
        'https://connections-api.herokuapp.com/users/me',
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
