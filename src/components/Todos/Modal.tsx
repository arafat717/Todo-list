import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "@/Redux/hook";
import { addtodo, updateTodo } from "@/Redux/features/todoSlice";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Todo = {
  id: string;
  description: string;
  task: string;
  piority: string;
};

type TType = {
  type: string;
  todo: Todo;
};

const Modal = ({ type, todo }: TType) => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [piority, setPiority] = useState("high");
  const dispatch = useAppDispatch();
  const idstring = Math.random().toString(36).substring(2, 7);
  console.log(piority);

  useEffect(() => {
    if (type === "update" && todo) {
      setTask(todo.task || "");
      setDescription(todo.description);
      setPiority(todo.piority);
    }
  }, [type, todo]);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (task === "") {
      alert("added something in task");
    }
    if (type === "add") {
      if (task && description) {
        const tododetails = {
          id: idstring,
          isComplete: false,
          task,
          description,
          piority,
        };
        dispatch(addtodo(tododetails));
      }
    }
    if (type === "update" && todo) {
      if (
        todo.task !== task ||
        todo.description !== description ||
        todo.piority !== piority
      ) {
        dispatch(updateTodo({ ...todo, task, description, piority }));
      } else {
        alert("No changes made");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={type === "update" ? "bg-[#5C53FE]" : "bg-primary-gradiant"}
        >
          {type === "update" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487 18.549 2.8a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          ) : (
            "Add todo"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type === "update" ? "Update" : "Add"} Task</DialogTitle>
          <DialogDescription>
            Add task here for complete the task.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task" className="text-right">
              Task
            </Label>
            <Input
              value={task}
              onChange={handleTaskChange}
              id="task"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              value={description}
              onChange={handleDescriptionChange}
              id="description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Piority
            </Label>
            <Select onValueChange={(value) => setPiority(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Piority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="low">Law</SelectItem>
                  <SelectItem value="medum">Medum</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button className="bg-primary-gradiant" type="submit">
                {type === "update" ? "Update" : "Add"} Task
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
