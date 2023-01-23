import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://63c3aa4af0028bf85f9c3b5e.mockapi.io/contacts';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async () =>
    await fetch(BASE_URL)
      .then(res => res.json())
      .then(data => data)
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async data => {
    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return data;
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    return id;
  }
);
