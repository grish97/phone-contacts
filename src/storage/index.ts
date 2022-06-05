import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import { contactSlice } from "./slices/contact";

export const rootReducer = combineReducers({
  contacts: contactSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
