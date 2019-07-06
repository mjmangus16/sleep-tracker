import React, { useContext } from "react";
import { AuthContext } from "./contextAPI/AuthContext";
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { SET_CURRENT_USER } from "./store/actions/types";

import { Route } from "react-router-dom";

import Header from "./Components/Header";
import CreateUserForm from "./Components/CreateUserForm";
import LoginForm from "./Components/LoginForm";
import DashboardContainer from "./Components/Dashboard/Container";
import PrivateRoute from "./util/PrivateRoute";

const App = () => {
  const [store, dispatch, loginUser, setCurrentUser] = useContext(AuthContext);

  // Check for token
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    setCurrentUser(decoded);

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      // dispatch(logoutUser());
      // Redirect to home
      window.location.href = "/";
    }
  }

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
      <Header />
      <Route exact path="/" render={props => <LoginForm {...props} />} />
      <Route path="/create" render={props => <CreateUserForm {...props} />} />
      <PrivateRoute path="/dashboard" component={DashboardContainer} />
    </div>
  );
};

export default App;
