import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import conatctApi from "./api";

import { TContactState, AsyncActions, IContact, TNewContact } from "./types";
import { StoreLoadingEnum } from "storage/types";

const initialState: TContactState = {
  loading: StoreLoadingEnum.idle,
  error: null,
  data: null,
};

/**
 * Async Actions
 */

export const queryContacts = createAsyncThunk<IContact[]>(
  AsyncActions.query,
  async () => {
    return await conatctApi.query();
  }
);

export const createContact = createAsyncThunk<IContact, TNewContact>(
  AsyncActions.create,
  async (data) => {
    const newContact = await conatctApi.create(data);
    return newContact;
  }
);

export const updateContact = createAsyncThunk<
  Partial<IContact>,
  Partial<IContact>
>(AsyncActions.update, async (data) => {
  console.log(data);
  await conatctApi.update(data);
  return data;
});

export const deleteConatct = createAsyncThunk<number, number>(
  AsyncActions.delete,
  async (contactId) => {
    await conatctApi.delete(contactId);
    return contactId;
  }
);

/**
 * Slices
 */
export const contactSlice = createSlice({
  name: "conatct",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    // query conatcts
    [`${queryContacts.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${queryContacts.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.data = action.payload;
    },
    [`${queryContacts.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error =
        action.payload.error?.response?.data || "something went wrong";
    },

    // create conatcts
    [`${createContact.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${createContact.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;

      state.data = state.data || [];
      state.data.push(action.payload);
    },
    [`${createContact.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error =
        action.payload.error?.response?.data || "something went wrong";
    },

    // update conatcts
    [`${updateContact.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${updateContact.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;

      // find updated contact and update it
      const conatcts = state.data || [];
      const needUpdateContact = conatcts.findIndex(
        (contact) => contact.id === action.payload.id
      );

      if (needUpdateContact !== -1) {
        conatcts[needUpdateContact] = {
          ...conatcts[needUpdateContact],
          ...action.payload,
        };
      }
    },
    [`${updateContact.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error =
        action.payload.error?.response?.data || "something went wrong";
    },

    // delete conatct
    [`${deleteConatct.pending}`]: (state) => {
      state.loading = StoreLoadingEnum.pending;
    },
    [`${deleteConatct.fulfilled}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.data =
        state.data?.filter((conatct) => conatct.id !== action.payload) || [];
    },
    [`${deleteConatct.rejected}`]: (state, action) => {
      state.loading = StoreLoadingEnum.loaded;
      state.error =
        action.payload.error?.response?.data || "something went wrong";
    },
  },
});

/**
 * Selectors
 */
export const contactSelector = (state: TContactState) => state.data;
export const contactLoadingSelector = (state: TContactState) => state.loading;
