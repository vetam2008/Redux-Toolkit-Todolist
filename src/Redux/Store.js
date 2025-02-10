import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './ToDoSlice';


let store = configureStore({
    reducer: {
        todos: todosReducer,
    },
});

export default store;