import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { deleteBook, changeBookStatus, editBook } from '../redux/actions/bookActions';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';
import { Book } from '../redux/reducers/bookReducer';

const BookList = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const dispatch: AppDispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [currentBook, setCurrentBook] = useState<Partial<Book>>({});

  const handleClose = () => setShow(false);
  const handleShow = (book: Book) => {
    setCurrentBook(book);
    setShow(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteBook(id));
  };

  const handleStatusChange = (id: number, status: string) => {
    dispatch(changeBookStatus(id, status));
  };

  const handleEditSubmit = () => {
    if (currentBook && currentBook.id !== undefined) {
      dispatch(editBook(currentBook as Book));
      handleClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentBook({
      ...currentBook,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto mt-4">
      <table className="table table-bordered table-striped">
        <thead className="bg-gray-200">
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Sinh viên mượn</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.borrower}</td>
              <td>{book.borrowDate}</td>
              <td>{book.returnDate}</td>
              <td>
                <select
                  value={book.status}
                  onChange={(e) => handleStatusChange(book.id, e.target.value)}
                  className="form-select"
                  style={{ color: book.status === 'Đã trả' ? 'green' : 'red' }}
                >
                  <option value="Đã trả" style={{ color: 'green' }}>Đã trả</option>
                  <option value="Chưa trả" style={{ color: 'red' }}>Chưa trả</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleDelete(book.id)}
                >
                  <FaTrashAlt />
                </button>
                <button className="btn btn-primary" onClick={() => handleShow(book)}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentBook && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật tin mượn sách</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Tên sách</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={currentBook.title || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tên người mượn</Form.Label>
                <Form.Control
                  type="text"
                  name="borrower"
                  value={currentBook.borrower || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ngày mượn</Form.Label>
                <Form.Control
                  type="date"
                  name="borrowDate"
                  value={currentBook.borrowDate || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ngày trả</Form.Label>
                <Form.Control
                  type="date"
                  name="returnDate"
                  value={currentBook.returnDate || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleEditSubmit}>
              Cập nhật
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BookList;
