import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TTodo = {
  id: string;
  task: string;
  description: string;
  isComplete?: boolean;
  piority: string;
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
          isComplete: false,
        });
        window.localStorage.setItem("todos", JSON.stringify(todolistArr));
      } else {
        window.localStorage.setItem(
          "todos",
          JSON.stringify([{ ...action.payload, isComplete: false }])
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
    updateTodo: (state, action) => {
      const todoList = window.localStorage.getItem("todos");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        todoListArr.forEach((todo: TTodo, index: number) => {
          if (todo.id === action.payload.id) {
            todo.task = action.payload.task;
            todo.description = action.payload.description;
            todo.piority = action.payload.piority;
          }
        });
        window.localStorage.setItem("todos", JSON.stringify(todoListArr));
        state.todos = [...todoListArr];
      }
    },
  },
});

export const { addtodo, removetodo, toggleCompleted, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
