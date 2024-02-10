import Container from "@/components/Container";
import TodosContiner from "@/components/Todos/TodosContiner";
const Todo = () => {
  return (
    <Container>
      <h1 className="text-center text-3xl font-semibold my-10">My Todos</h1>
      <TodosContiner></TodosContiner>
    </Container>
  );
};

export default Todo;
