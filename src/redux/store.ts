import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer, { TodoState } from './reducers/todoReducer';

const saveState = (state: { todos: TodoState }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('todos', serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const loadState = (): { todos: TodoState } | undefined => {
  try {
    const serializedState = localStorage.getItem('todos');
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
    todos: todoReducer,
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

store.subscribe(() => {
  saveState({
    todos: store.getState().todos,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
