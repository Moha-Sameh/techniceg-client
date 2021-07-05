import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import "./style/index.css";
import Navbar from "./style/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={LoginPage} exact />
        <Route path="/task" component={TodoPage} />
      </Switch>
    </Router>
  );
};

export default App;
