import { observer } from "mobx-react";
import React from "react";
import TodoList from "../components/TodoListComponent";

const TodoPage: React.FC = () => {
  return <TodoList />;
};

export default observer(TodoPage);
