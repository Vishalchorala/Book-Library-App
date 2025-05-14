import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "../utils/bookSlice";
import collectionsSlice from "../utils/collectionSlice"

const store = configureStore({
  reducer: {
    books: booksSlice,
    collections: collectionsSlice,
  },
});

export default store;
