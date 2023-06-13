import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://64886b320e2469c038fdb147.mockapi.io/contacts';

export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContact',
  async (contact) => {
    const response = await axios.post(API_BASE_URL, contact);
    return response.data;
  }
);
export const updateFilter = (filter) => {
  return {
    type: 'contacts/updateFilter',
    payload: filter,
  };
};
export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId) => {
    await axios.delete(`${API_BASE_URL}/${contactId}`);
    return contactId;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      });
  },
});

export const contactsSelector = (state) => state.contacts.items;

export default contactsSlice.reducer;
