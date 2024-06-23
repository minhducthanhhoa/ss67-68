import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Book {
  id: number;
  title: string;
  borrower: string;
  borrowDate: string;
  returnDate: string;
  status: string;
}

export interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<Book>) {
      state.books.push(action.payload);
    },
    removeBook(state, action: PayloadAction<number>) {
      state.books = state.books.filter(book => book.id !== action.payload);
    },
    updateBook(state, action: PayloadAction<Book>) {
      const index = state.books.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    updateBookStatus(state, action: PayloadAction<{ id: number, status: string }>) {
      const book = state.books.find(book => book.id === action.payload.id);
      if (book) {
        book.status = action.payload.status;
      }
    },
  },
});

export const { addBook, removeBook, updateBook, updateBookStatus } = bookSlice.actions;
export default bookSlice.reducer;
