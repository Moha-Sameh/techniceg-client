import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionActions from "@material-ui/core/AccordionActions";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import { ITaskData } from "../store/taskStore";
import authStore from "../store/authStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
      margin: theme.spacing(1),
      minWidth: 120,
    },
    icon: {
      verticalAlign: "bottom",
      height: 20,
      width: 20,
    },
    details: {
      alignItems: "center",
    },
    column: {
      flexBasis: "33.33%",
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: "none",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);

interface ITodoRowProps {
  task: ITaskData;
  onChange: any;
}

const TodoRow: React.FC<ITodoRowProps> = ({ task, onChange }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <div className={classes.column}>
          <Typography className={classes.heading}>{task.title}</Typography>
        </div>
        <div className={classes.column}>
          <FormControl className={classes.secondaryHeading}>
            {authStore.user?.role === "Freelancer" ? (
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={task.status}
                onChange={onChange}
              >
                <MenuItem value="Todo">Todo</MenuItem>
                <MenuItem value="InProgress">In-Progress</MenuItem>
                <MenuItem value="Test">Test</MenuItem>
                <MenuItem value="Done" disabled>
                  Done
                </MenuItem>
                <MenuItem value="Paid" disabled>
                  Paid
                </MenuItem>
              </Select>
            ) : (
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={task.status}
                onChange={onChange}
              >
                <MenuItem value="Todo" disabled>
                  Todo
                </MenuItem>
                <MenuItem value="InProgress" disabled>
                  In-Progress
                </MenuItem>
                <MenuItem value="Test" disabled>
                  Test
                </MenuItem>
                <MenuItem value="Done">Done</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
              </Select>
            )}
          </FormControl>
        </div>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        <div className={classes.column}>
          <Typography variant="caption">
            {task.description}
            <br />
          </Typography>
          <Typography variant="caption">
            {task.price}
            <br />
          </Typography>
        </div>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button size="small">Cancel</Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default observer(TodoRow);
