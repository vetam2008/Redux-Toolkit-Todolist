import { createSlice } from "@reduxjs/toolkit";

const ToDoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTask: (state, action) => {
        state.push(action.payload);
        },
        deleteTask: (state, action) => {
        return state.filter((todo) => todo.id !== action.payload);
        },
        toggleTask: (state, action) => {
        return state.map((todo) =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        );
        },
    },
    });

export const { addTask, deleteTask, toggleTask } = ToDoSlice.actions;

export default ToDoSlice.reducer;