import { createSlice } from "@reduxjs/toolkit";

const savedCollections = localStorage.getItem("collectionsData");
const initialState = {
  collections: savedCollections ? JSON.parse(savedCollections) : [],
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    createCollection: (state, action) => {
      const { id, name } = action.payload;
      const exists = state.collections.some(
        (collection) => collection.id === id
      );
      if (!exists) {
        state.collections.push({ id, name, bookIds: [] });
        localStorage.setItem(
          "collectionsData",
          JSON.stringify(state.collections)
        );
      }
    },

    addBookToCollection: (state, action) => {
      const { collectionId, bookId } = action.payload;
      const collection = state.collections.find(
        (collection) => collection.id === collectionId
      );
      if (collection && !collection.bookIds.includes(bookId)) {
        collection.bookIds.push(bookId);
        localStorage.setItem(
          "collectionsData",
          JSON.stringify(state.collections)
        );
      }
    },

    removeBookFromCollection: (state, action) => {
      const { collectionId, bookId } = action.payload;
      const collection = state.collections.find(
        (collection) => collection.id === collectionId
      );
      if (collection) {
        collection.bookIds = collection.bookIds.filter((id) => id !== bookId);
        localStorage.setItem(
          "collectionsData",
          JSON.stringify(state.collections)
        );
      }
    },

    removeCollection: (state, action) => {
      const collectionId = action.payload;
      state.collections = state.collections.filter(
        (collection) => collection.id !== collectionId
      );
      localStorage.setItem(
        "collectionsData",
        JSON.stringify(state.collections)
      );
    },
  },
});

export const {
  createCollection,
  addBookToCollection,
  removeBookFromCollection,
  removeCollection,
} = collectionsSlice.actions;

export default collectionsSlice.reducer;
