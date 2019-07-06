import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter } from "react-router-dom";

import { AuthProvider } from "./contextAPI/AuthContext";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./App";
import rootReducer from "./store/reducers";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const AppWithRouter = withRouter(App);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[200]
    },
    secondary: {
      main: indigo[200]
    },
    type: "dark"
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <AuthProvider>
          <AppWithRouter />
        </AuthProvider>
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
