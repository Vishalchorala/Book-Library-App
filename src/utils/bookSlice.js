import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(
    "https://potterapi-fedeperin.vercel.app/en/books"
  );
  return response.data;
});

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);

      const customBooks = state.books.filter((book) => book.isCustom);
      localStorage.setItem("customBooks", JSON.stringify(customBooks));
    },

    deleteCustomBook: (state, action) => {
      const idToDelete = action.payload;
      state.books = state.books.filter(
        (book) => !(book.isCustom && book.id === idToDelete)
      );

      const customBooks = state.books.filter((book) => book.isCustom);
      localStorage.setItem("customBooks", JSON.stringify(customBooks));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;

        const customBooks =
          JSON.parse(localStorage.getItem("customBooks")) || [];
        state.books = [...state.books, ...customBooks];
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addBook, deleteCustomBook } = booksSlice.actions;
export default booksSlice.reducer;
