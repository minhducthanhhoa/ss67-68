import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';

const App = () => {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Quản lý mượn trả sách</h1>
        <AddBookForm />
        <BookList />
      </div>
    </Provider>
  );
};

export default App;
