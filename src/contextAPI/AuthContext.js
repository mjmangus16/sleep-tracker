import React, { createContext, useReducer, useEffect } from "react";

import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";
import isEmpty from "../util/is-empty";

const link = "https://bw-sleep-tracker-app.herokuapp.com";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export const AuthContext = createContext();

export const AuthProvider = props => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: {}
  });

  useEffect(() => {
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
  }, []);

  const registerUser = (userData, redirect) => {
    console.log(redirect);
    axios
      .post(`${link}/register`, userData)
      .then(res => redirect.push("/"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  const loginUser = (userData, redirect) => {
    axios
      .post(`${link}/login`, userData)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        setCurrentUser(decoded);
        redirect.push("/dashboard");
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  const setCurrentUser = decoded => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  };

  const logoutUser = redirect => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    setCurrentUser({});
    redirect.push("/");
  };

  return (
    <AuthContext.Provider
      value={[
        state,
        dispatch,
        loginUser,
        setCurrentUser,
        logoutUser,
        registerUser
      ]}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
