import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Giao diện Todolist</h1>
        <AddTodoForm />
        <TodoList />
      </div>
    </Provider>
  );
};

export default App;
