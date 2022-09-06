import counterReducer from '../store/Counter/Slice';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../store/User/Slice';
import bluetoothReducer from '../store/Bluetooth/Slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    bluetooth: bluetoothReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
