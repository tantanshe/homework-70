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
  fetchLoading: boolean;
  addLoading: boolean;
  editLoading: boolean;
  deleteLoading: boolean;
  error: boolean;
}

const initialState: ContactsState = {
  contacts: [],
  fetchLoading: false,
  addLoading: false,
  editLoading: false,
  deleteLoading: false,
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
  const {data: contact} = await axiosApi.post<Contact>(`contacts.json`, newContact);
  return contact;
});

export const editContact = createAsyncThunk<Contact, { id: string, updatedContact: Contact }>('contacts/editContact',
  async ({id, updatedContact}) => {
    const {data: contact} = await axiosApi.put<Contact>(`/contacts/${id}.json`, updatedContact);
    return contact;
  });

export const deleteContact = createAsyncThunk<string, string, { state: RootState }>('todo/deleteTodo',
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
        state.fetchLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state: ContactsState, action: PayloadAction<Contact[]>) => {
        state.fetchLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state: ContactsState) => {
        state.fetchLoading = false;
        state.error = true;
      });

    builder
      .addCase(addContact.pending, (state: ContactsState) => {
        state.error = false;
        state.addLoading = true;
      })
      .addCase(addContact.fulfilled, (state: ContactsState, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
        state.addLoading = false;
      })
      .addCase(addContact.rejected, (state: ContactsState) => {
        state.addLoading = false;
        state.error = true;
      });

    builder
      .addCase(editContact.pending, (state: ContactsState) => {
        state.error = false;
        state.editLoading = true;
      })
      .addCase(editContact.fulfilled, (state: ContactsState) => {
        state.editLoading = false;
      })
      .addCase(editContact.rejected, (state: ContactsState) => {
        state.editLoading = false;
        state.error = true;
      })

    builder
      .addCase(deleteContact.pending, (state: ContactsState) => {
        state.error = false;
        state.deleteLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state: ContactsState, {payload: contact}) => {
        state.contacts = state.contacts.filter(contacts => contacts.id !== contact);
        state.deleteLoading = false;
      })
      .addCase(deleteContact.rejected, (state: ContactsState) => {
        state.deleteLoading = false;
        state.error = true;
      });
  },
});

export const selectFetchContactsLoading = (state: RootState) => state.contacts.fetchLoading;
export const selectAddContactLoading = (state: RootState) => state.contacts.addLoading;
export const selectEditContactLoading = (state: RootState) => state.contacts.editLoading;
export const selectDeleteContactLoading = (state: RootState) => state.contacts.deleteLoading;

export const contactsReducer = contactsSlice.reducer;