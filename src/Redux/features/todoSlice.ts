import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TTodo = {
  id: string;
  title: string;
  description: string;
  isComplete?: boolean;
};

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addtodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isComplete: false });
    },
    removetodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    toggleCompleted: (state, action: PayloadAction<string>) => {
      const task = state.todos.find((item) => item.id === action.payload);
      task!.isComplete = !task?.isComplete;
    },
  },
});

export const { addtodo, removetodo, toggleCompleted } = todoSlice.actions;

export default todoSlice.reducer;
