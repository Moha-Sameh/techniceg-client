import { observer } from "mobx-react";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import authStore from "./store/authStore";
import "./style/index.css";
import Navbar from "./style/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/task">
          {authStore.user ? <TodoPage /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default observer(App);
