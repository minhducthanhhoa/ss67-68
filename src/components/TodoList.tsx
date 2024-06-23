import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { deleteTodo, toggleCompletion, clearTodos, completeAll, editTodo, filterByLevel } from '../redux/actions/todoActions';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { Button, Modal, Form } from 'react-bootstrap';
import { Todo } from '../redux/reducers/todoReducer';

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.filteredTodos);
  const dispatch: AppDispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Partial<Todo>>({});
  const [filterLevel, setFilterLevel] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
    setShowDeleteModal(false);
  };

  const handleToggleCompletion = (id: number) => {
    dispatch(toggleCompletion(id));
  };

  const handleClearTodos = () => {
    dispatch(clearTodos());
  };

  const handleCompleteAll = () => {
    dispatch(completeAll());
  };

  const handleFilter = (level: number) => {
    setFilterLevel(level);
    dispatch(filterByLevel(level));
  };

  const handleEditSubmit = () => {
    if (currentTodo && currentTodo.id !== undefined) {
      dispatch(editTodo(currentTodo as Todo));
      setShowEditModal(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentTodo({
      ...currentTodo,
      [name]: value,
    });
  };

  const confirmDelete = (id: number) => {
    setCurrentTodo({
      id,
    });
    setShowDeleteModal(true);
  };

  const confirmEdit = (todo: Todo) => {
    setCurrentTodo(todo);
    setShowEditModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentTodo({});
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentTodo({});
  };

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-center">Danh sách công việc</h2>
      <div className="d-flex justify-content-between mb-4">
        <div>
          <select onChange={(e) => handleFilter(parseInt(e.target.value))} value={filterLevel || ''}>
            <option value="">Lọc công việc theo cấp độ</option>
            <option value={0}>Khẩn cấp</option>
            <option value={1}>Quan trọng</option>
            <option value={2}>Bình thường</option>
            <option value={3}>Không quan trọng</option>
          </select>
        </div>
        <Button variant="primary" onClick={() => setShowEditModal(true)}>Thêm</Button>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="bg-gray-200">
          <tr>
            <th>STT</th>
            <th>Tên công việc</th>
            <th>Cấp độ</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td className={todo.completed ? 'line-through' : ''}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleCompletion(todo.id)}
                />
                {todo.title}
              </td>
              <td>
                {todo.level === 0 && <span className="badge bg-danger">Khẩn cấp</span>}
                {todo.level === 1 && <span className="badge bg-warning">Quan trọng</span>}
                {todo.level === 2 && <span className="badge bg-info">Bình thường</span>}
                {todo.level === 3 && <span className="badge bg-secondary">Không quan trọng</span>}
              </td>
              <td>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => confirmEdit(todo)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => confirmDelete(todo.id)}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <span>Số công việc hoàn thành: {todos.filter(todo => todo.completed).length}</span>
        <div>
          <Button variant="primary" onClick={handleCompleteAll}>Hoàn thành tất cả</Button>
          <Button variant="danger" onClick={handleClearTodos}>Xóa tất cả</Button>
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn chắc chắn muốn xóa công việc này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Hủy
          </Button>
          <Button variant="danger" onClick={() => currentTodo && currentTodo.id !== undefined && handleDelete(currentTodo.id)}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật công việc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Tên công việc</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentTodo?.title || ''}
                onChange={handleInputChange}
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
                  checked={currentTodo?.level === 0}
                  onChange={(e) => handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                />
                <Form.Check
                  inline
                  label="Quan trọng"
                  type="radio"
                  name="level"
                  value={1}
                  checked={currentTodo?.level === 1}
                  onChange={(e) => handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                />
                <Form.Check
                  inline
                  label="Bình thường"
                  type="radio"
                  name="level"
                  value={2}
                  checked={currentTodo?.level === 2}
                  onChange={(e) => handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                />
                <Form.Check
                  inline
                  label="Không quan trọng"
                  type="radio"
                  name="level"
                  value={3}
                  checked={currentTodo?.level === 3}
                  onChange={(e) => handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoList;
