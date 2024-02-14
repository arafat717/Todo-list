import { useAppDispatch } from "@/Redux/hook";
import { Button } from "../ui/button";
import { removetodo, toggleCompleted } from "@/Redux/features/todoSlice";
import Modal from "./Modal";

type TTodoProps = {
  id: string;
  task: string;
  description: string;
  isComplete?: boolean;
};

const TodoCard = ({ task, description, id, isComplete }: TTodoProps) => {
  const dispatch = useAppDispatch();

  const togglestate = () => {
    dispatch(toggleCompleted(id));
  };

  const array = {
    task,
    description,
    id,
    isComplete,
  };

  return (
    <div className="bg-white rounded-lg flex justify-between p-5 border ">
      <input
        onChange={togglestate}
        type="checkbox"
        name="completed"
        id="completed"
      />
      <p>{task}</p>
      {/* <p>Time</p> */}
      <div>
        {isComplete ? (
          <p className="text-green-500">Done</p>
        ) : (
          <p className="text-red-500">Pending</p>
        )}
      </div>
      <p>{description}</p>
      <div className="flex space-x-5">
        <Button onClick={() => dispatch(removetodo(id))} className="bg-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Button>
        <Modal todo={array} type={"update"}></Modal>
      </div>
    </div>
  );
};

export default TodoCard;
