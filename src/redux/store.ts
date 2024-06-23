import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bookReducer, { BookState } from './reducers/bookReducer';

const saveState = (state: { books: BookState }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('books', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const loadState = (): { books: BookState } | undefined => {
  try {
    const serializedState = localStorage.getItem('books');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

store.subscribe(() => {
  saveState({
    books: store.getState().books,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
