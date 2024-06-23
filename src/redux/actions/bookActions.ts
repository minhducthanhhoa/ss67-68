import { Book } from '../reducers/bookReducer';
import { addBook, removeBook, updateBook, updateBookStatus } from '../reducers/bookReducer';
import { AppThunk } from '../store';

export const addNewBook = (book: Book): AppThunk => (dispatch) => {
  dispatch(addBook(book));
};

export const deleteBook = (id: number): AppThunk => (dispatch) => {
  dispatch(removeBook(id));
};

export const editBook = (book: Book): AppThunk => (dispatch) => {
  dispatch(updateBook(book));
};

export const changeBookStatus = (id: number, status: string): AppThunk => (dispatch) => {
  dispatch(updateBookStatus({ id, status }));
};
