import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewBook } from '../redux/actions/bookActions';
import { AppThunk, AppDispatch } from '../redux/store';
import { Book } from '../redux/reducers/bookReducer';

const AddBookForm = () => {
  const [title, setTitle] = useState('');
  const [borrower, setBorrower] = useState('');
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleAddBook = () => {
    const newBook: Book = {
      id: Date.now(),
      title,
      borrower,
      borrowDate,
      returnDate,
      status: 'Chưa trả',
    };
    dispatch(addNewBook(newBook) as AppThunk);
  };

  return (
    <div className="container mx-auto mt-4 p-4 border rounded shadow-md">
      <h3 className="text-lg font-bold mb-4">Thêm mới thông tin mượn trả sách</h3>
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
      <button onClick={handleAddBook} className="btn btn-success">Thêm</button>
    </div>
  );
};

export default AddBookForm;
