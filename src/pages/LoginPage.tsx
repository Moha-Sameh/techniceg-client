import { observer } from "mobx-react";
import React from "react";
import SignIn from "../components/LoginComponent";

const LoginPage: React.FC = () => {
  return <SignIn />;
};

export default observer(LoginPage);
