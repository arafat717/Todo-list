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

const initialtodo = () => {
  const localtodolist = window.localStorage.getItem("todos");
  if (localtodolist) {
    return JSON.parse(localtodolist);
  }
  window.localStorage.setItem("todos", JSON.stringify([]));
  return [];
};

const initialState: TInitialState = {
  todos: initialtodo(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addtodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isComplete: false });
      const todos = window.localStorage.getItem("todos");
      if (todos) {
        const todolistArr = JSON.parse(todos);
        todolistArr.push({
          ...action.payload,
        });
        window.localStorage.setItem("todos", JSON.stringify(todolistArr));
      } else {
        window.localStorage.setItem(
          "todos",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    removetodo: (state, action: PayloadAction<string>) => {
      const todolist = window.localStorage.getItem("todos");
      if (todolist) {
        const todolistArr = JSON.parse(todolist);
        todolistArr.forEach((todo: { id: string }, index: number) => {
          if (todo.id === action.payload) {
            todolistArr.splice(index, 1);
          }
        });
        window.localStorage.setItem("todos", JSON.stringify(todolistArr));
        state.todos = todolistArr;
      }
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
