import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

import { Card, TextField, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { registerUser } from "../store/actions/authActions";

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

const CreateUserForm = ({ classes, registerUser, history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  const handleUsername = e => {
    setUsername(e.target.value);
  };
  const handlePassword = e => {
    setPassword(e.target.value);
  };
  const handleEmail = e => {
    setEmail(e.target.value);
  };
  const handleFirst_name = e => {
    setFirst_name(e.target.value);
  };
  const handleLast_name = e => {
    setLast_name(e.target.value);
  };

  const loginSubmit = e => {
    e.preventDefault();
    let user = {
      username,
      password,
      email,
      first_name,
      last_name
    };
    registerUser(user, history);
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
          Create User
        </Typography>
        <TextField
          id="standard-name"
          label="First Name"
          name="first_name"
          className={classes.textField}
          value={first_name}
          onChange={handleFirst_name}
          margin="normal"
        />
        <TextField
          id="standard-name"
          label="Last Name"
          name="last_name"
          className={classes.textField}
          value={last_name}
          onChange={handleLast_name}
          margin="normal"
        />
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
          label="Email"
          name="email"
          className={classes.textField}
          value={email}
          onChange={handleEmail}
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
          CREATE USER
        </Button>
        <Typography
          variant="body1"
          style={{ padding: 10, textAlign: "center" }}
        >
          Already have a username? <br />{" "}
          <Link to="/" style={{ color: "white" }}>
            Login Here.
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    registering: state.registering,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(withStyles(styles)(CreateUserForm));
