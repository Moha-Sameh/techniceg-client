import { observer } from "mobx-react";
import React from "react";
import taskStore, { ITaskData } from "../store/taskStore";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TodoRow from "./TodoRow";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
  })
);

const TodoList: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();

  const handleChange = (id: number) => async (event: any) => {
    await taskStore.updateTask({ status: event.target.value, id: id }, history);
  };

  const data = taskStore.tasks;

  return (
    <div className={classes.root}>
      {data.map((task: ITaskData) => (
        <TodoRow task={task} onChange={handleChange(task.id)} key={task.id} />
      ))}
    </div>
  );
};

export default observer(TodoList);
