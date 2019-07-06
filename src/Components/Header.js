import React, { useContext } from "react";
import { AuthContext } from "../contextAPI/AuthContext";
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

const Header = ({ classes, history }) => {
  const {
    0: { isAuthenticated },
    4: logoutUser
  } = useContext(AuthContext);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.root}>
            Sleep Tracker
          </Typography>
          {isAuthenticated && (
            <Button variant="outlined" onClick={() => logoutUser(history)}>
              LOGOUT
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Header);
