import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { addNewTodo } from '../redux/actions/todoActions';
import { Modal, Button, Form } from 'react-bootstrap';

const AddTodoForm = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [level, setLevel] = useState<number | null>(null);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch: AppDispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    if (title.trim() === '' || level === null) {
      alert('Tên công việc và cấp độ không được để trống');
      return;
    }

    if (todos.find(todo => todo.title === title)) {
      alert('Tên công việc không được trùng');
      return;
    }

    const newTodo = {
      id: Date.now(),
      title,
      level,
      completed: false,
    };

    dispatch(addNewTodo(newTodo));
    handleClose();
    setTitle('');
    setLevel(null);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Thêm
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tên công việc</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cấp độ</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Khẩn cấp"
                  type="radio"
                  name="level"
                  value={0}
                  onChange={(e) => setLevel(parseInt(e.target.value))}
                />
                <Form.Check
                  inline
                  label="Quan trọng"
                  type="radio"
                  name="level"
                  value={1}
                  onChange={(e) => setLevel(parseInt(e.target.value))}
                />
                <Form.Check
                  inline
                  label="Bình thường"
                  type="radio"
                  name="level"
                  value={2}
                  onChange={(e) => setLevel(parseInt(e.target.value))}
                />
                <Form.Check
                  inline
                  label="Không quan trọng"
                  type="radio"
                  name="level"
                  value={3}
                  onChange={(e) => setLevel(parseInt(e.target.value))}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Thêm mới
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTodoForm;
