import axiosApi from '../axiosApi';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../app/store';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
}

interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
  error: boolean;
}

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  error: false,
};

export const fetchContacts = createAsyncThunk<Contact[]>('contacts/fetchContacts', async () => {
  const {data: contact} = await axiosApi.get('/contacts.json');
  return Object.keys(contact).map(id => ({
    id,
    ...contact[id],
  }));
});

export const addContact = createAsyncThunk<Contact, Contact>('contacts/addContact', async (newContact) => {
  const {data: contact} = await axiosApi.post<Contact>(`/contacts.json`, newContact);
  return {id: contact.name, ...newContact};
});

export const editContact = createAsyncThunk<Contact, { id: string, updatedContact: Contact }>('contacts/editContact',
  async ({id, updatedContact}) => {
    const {data: contact} = await axiosApi.put<Contact>(`/contacts/${id}.json`, updatedContact);
    return {id, ...contact};
  });

export const deleteContact = createAsyncThunk<string, string, { state: RootState }>('todo/deleteContact',
  async (id) => {
    await axiosApi.delete(`/contacts/${id}.json`);
    return id;
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    emptyReducer: (state) => {
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state: ContactsState) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state: ContactsState, action: PayloadAction<Contact[]>) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state: ContactsState) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(addContact.pending, (state: ContactsState) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state: ContactsState, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(addContact.rejected, (state: ContactsState) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(editContact.pending, (state: ContactsState) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(editContact.fulfilled, (state: ContactsState) => {
        state.isLoading = false;
      })
      .addCase(editContact.rejected, (state: ContactsState) => {
        state.isLoading = false;
        state.error = true;
      });

    builder
      .addCase(deleteContact.pending, (state: ContactsState) => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state: ContactsState, {payload: id}) => {
        state.contacts = state.contacts.filter(contacts => contacts.id !== id);
        state.isLoading = false;
      })
      .addCase(deleteContact.rejected, (state: ContactsState) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectIsContactsLoading = (state: RootState) => state.contacts.isLoading;
export const selectError = (state: RootState) => state.contacts.error;

export const contactsReducer = contactsSlice.reducer;