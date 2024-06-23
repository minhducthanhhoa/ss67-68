import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  title: string;
  level: number; 
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  filteredTodos: Todo[];
}

const initialState: TodoState = {
  todos: [],
  filteredTodos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      state.filteredTodos = state.todos;
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.filteredTodos = state.todos;
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
        state.filteredTodos = state.todos;
      }
    },
    toggleTodoCompletion: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        state.filteredTodos = state.todos;
      }
    },
    clearAllTodos: (state) => {
      state.todos = [];
      state.filteredTodos = [];
    },
    completeAllTodos: (state) => {
      state.todos.forEach(todo => {
        todo.completed = true;
      });
      state.filteredTodos = state.todos;
    },
    filterTodos: (state, action: PayloadAction<number>) => {
      state.filteredTodos = state.todos.filter(todo => todo.level === action.payload);
    },
  },
});

export const { addTodo, removeTodo, updateTodo, toggleTodoCompletion, clearAllTodos, completeAllTodos, filterTodos } = todoSlice.actions;
export default todoSlice.reducer;
