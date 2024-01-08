import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      if (!persistedToken) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(
        'https://connections-api.herokuapp.com/contacts',
        {
          headers: {
            Authorization: `Bearer ${persistedToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      localStorage.setItem('contacts', JSON.stringify(data));

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, number }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      if (!persistedToken) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(
        'https://connections-api.herokuapp.com/contacts',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${persistedToken}`,
          },
          body: JSON.stringify({ name, number, owner: state.auth.user.id }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;

      if (!persistedToken) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(
        `https://connections-api.herokuapp.com/contacts/${contactId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${persistedToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return contactId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
