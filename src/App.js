import React from "react";

import { Route } from "react-router-dom";

import Header from "./Components/Header";
import CreateUserForm from "./Components/CreateUserForm";
import LoginForm from "./Components/LoginForm";
import DashboardContainer from "./Components/Dashboard/Container";
import PrivateRoute from "./util/PrivateRoute";

const App = () => {
  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        height: "100%",
        backgroundColor: "#262626",
        paddingBottom: 100
      }}
    >
      <Route render={props => <Header {...props} />} />

      <Route exact path="/" render={props => <LoginForm {...props} />} />
      <Route path="/create" render={props => <CreateUserForm {...props} />} />
      <PrivateRoute path="/dashboard" component={DashboardContainer} />
    </div>
  );
};

export default App;
