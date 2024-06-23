import { Todo } from '../reducers/todoReducer';
import { addTodo, removeTodo, updateTodo, toggleTodoCompletion, clearAllTodos, completeAllTodos, filterTodos } from '../reducers/todoReducer';
import { AppThunk } from '../store';

export const addNewTodo = (todo: Todo): AppThunk => (dispatch) => {
  dispatch(addTodo(todo));
};

export const deleteTodo = (id: number): AppThunk => (dispatch) => {
  dispatch(removeTodo(id));
};

export const editTodo = (todo: Todo): AppThunk => (dispatch) => {
  dispatch(updateTodo(todo));
};

export const toggleCompletion = (id: number): AppThunk => (dispatch) => {
  dispatch(toggleTodoCompletion(id));
};

export const clearTodos = (): AppThunk => (dispatch) => {
  dispatch(clearAllTodos());
};

export const completeAll = (): AppThunk => (dispatch) => {
  dispatch(completeAllTodos());
};

export const filterByLevel = (level: number): AppThunk => (dispatch) => {
  dispatch(filterTodos(level));
};
