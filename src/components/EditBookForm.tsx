import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { editBook } from '../redux/actions/bookActions';
import { Book } from '../redux/reducers/bookReducer';

interface EditBookFormProps {
  bookId: number;
}

const EditBookForm: React.FC<EditBookFormProps> = ({ bookId }) => {
  const dispatch: AppDispatch = useDispatch();
  const book = useSelector((state: RootState) => state.books.books.find(b => b.id === bookId));

  const [title, setTitle] = useState(book?.title ?? '');
  const [borrower, setBorrower] = useState(book?.borrower ?? '');
  const [borrowDate, setBorrowDate] = useState(book?.borrowDate ?? '');
  const [returnDate, setReturnDate] = useState(book?.returnDate ?? '');

  const handleUpdateBook = () => {
    if (book) {
      const updatedBook: Book = {
        ...book,
        title,
        borrower,
        borrowDate,
        returnDate,
      };
      dispatch(editBook(updatedBook));
    }
  };

  return (
    <div className="container mx-auto mt-4 p-4 border rounded shadow-md">
      <h3 className="text-lg font-bold mb-4">Cập nhật thông tin mượn trả sách</h3>
      <div className="mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tên sách"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={borrower}
          onChange={(e) => setBorrower(e.target.value)}
          placeholder="Tên người mượn"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="date"
          value={borrowDate}
          onChange={(e) => setBorrowDate(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="form-control"
        />
      </div>
      <button onClick={handleUpdateBook} className="btn btn-primary">Cập nhật</button>
    </div>
  );
};

export default EditBookForm;
