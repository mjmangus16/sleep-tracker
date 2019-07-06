import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contextAPI/AuthContext";

import { Card, TextField, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: "10px auto"
  },
  cardContainer: {
    width: 500,
    height: "auto",
    margin: "25px auto auto",
    display: "flex",
    justifyContent: "center"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    margin: "auto"
  },
  textField: {
    width: 300,
    margin: "auto"
  },
  button: {
    margin: theme.spacing(5),
    width: 300,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

const LoginForm = ({ classes, login, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { 2: loginUser } = useContext(AuthContext);

  const handleUsername = event => {
    setUsername(event.target.value);
  };

  const handlePassword = event => {
    setPassword(event.target.value);
  };

  const loginSubmit = e => {
    e.preventDefault();
    let user = {
      username,
      password
    };
    loginUser(user, history);
  };

  return (
    <Card className={classes.cardContainer} raised>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={loginSubmit}
      >
        <Typography variant="h6" color="inherit" className={classes.root}>
          Login
        </Typography>
        <TextField
          id="standard-name"
          label="Username"
          name="username"
          className={classes.textField}
          value={username}
          onChange={handleUsername}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Password"
          type="password"
          name="password"
          className={classes.textField}
          value={password}
          onChange={handlePassword}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          LOGIN
        </Button>
        <Typography
          variant="body1"
          style={{ padding: 10, textAlign: "center" }}
        >
          Don't have a username? <br />{" "}
          <Link to="/create" style={{ color: "white" }}>
            Create an account here.
          </Link>{" "}
        </Typography>
      </form>
    </Card>
  );
};

export default withStyles(styles)(LoginForm);
