import { ReactNode } from "react";

type TodosContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: TodosContainerProps) => {
  return <div className="h-screen w-full max-w-7xl mx-auto">{children}</div>;
};

export default Container;
