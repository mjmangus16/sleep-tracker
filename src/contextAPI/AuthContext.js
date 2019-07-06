import React, { createContext, useReducer, useEffect } from "react";

import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, LOGIN_USER } from "./types";
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

  const loginUser = (userData, redirect) => {
    axios
      .post(`${link}/login`, userData)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
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
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };

  return (
    <AuthContext.Provider value={[state, dispatch, loginUser, setCurrentUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};
