import { observer } from "mobx-react";
import React from "react";
import TodoList from "../components/TodoListComponent";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import taskStore from "../store/taskStore";

const TodoPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [task, setTask] = React.useState({
    title: "",
    description: "",
    price: 0,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.target.reset();
    e.preventDefault();
    taskStore.createTask(task);
  };

  return (
    <>
      <Button color="inherit" onClick={handleOpen}>
        <AddCircleIcon />
      </Button>
      {open ? (
        <form
          style={{ display: "grid", justifyContent: "center" }}
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Title"
            name="title"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Description"
            name="description"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Price"
            name="price"
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Submit
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="inherit"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </form>
      ) : null}

      <TodoList />
    </>
  );
};

export default observer(TodoPage);
