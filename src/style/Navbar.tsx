import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AnnouncementRoundedIcon from "@material-ui/icons/AnnouncementRounded";
import { useHistory } from "react-router-dom";
import authStore from "../store/authStore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const history = useHistory();

  const handleLogout = () => {
    authStore.signout();
    if (!authStore.user) history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <AnnouncementRoundedIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo
          </Typography>

          {authStore.user ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit">Register</Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
