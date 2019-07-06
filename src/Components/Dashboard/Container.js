import React, { useState } from "react";
import { ProfileProvider } from "../../contextAPI/ProfileContext";
import { withStyles } from "@material-ui/core/styles";
import { Toolbar, Fab, Paper, Tabs, Tab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import Recommendations from "./Recommendations";
import SleepInputForm from "./SleepInputForm";
import Daily from "./Daily";
import Weekly from "./Weekly";
import Monthly from "./Monthly";
import Yearly from "./Yearly";

const styles = theme => ({
  tabsRoot: {
    flexGrow: 1
  },
  root: {
    display: "flex",
    justifyContent: "flex-end"
  },
  fab: {
    margin: theme.spacing(3),
    textAlign: "right"
  }
});

const DashboardContainer = ({ classes }) => {
  const [tabValue, setTabValue] = useState(0);
  const [sleepInputStatus, setSleepInputStatus] = useState(false);
  const [activeData, setActiveData] = useState(null);
  const [recStatus, setRecStatus] = useState(false);

  const changeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleRecStatus = () => {
    setRecStatus(!recStatus);
  };

  const sleepInputOpen = () => {
    setSleepInputStatus(true);
  };

  const sleepInputClose = () => {
    setSleepInputStatus(false);
    setActiveData(null);
  };

  const editSleep = data => {
    setActiveData(data);
    setSleepInputStatus(!sleepInputStatus);
  };

  let content;

  if (tabValue === 0) {
    content = <Daily />;
  } else if (tabValue === 1) {
    content = <Weekly />;
  } else if (tabValue === 2) {
    content = <Monthly />;
  } else if (tabValue === 3) {
    content = <Yearly editSleep={editSleep} />;
  }

  return (
    <ProfileProvider>
      <div>
        <Paper className={classes.tabsRoot}>
          <Tabs value={tabValue} onChange={changeTab} centered>
            <Tab label="Daily" />
            <Tab label="Weekly" />
            <Tab label="Monthly" />
            <Tab label="Yearly" />
          </Tabs>
        </Paper>
        <Toolbar className={classes.root}>
          <Fab
            color="primary"
            aria-label="Add"
            size="small"
            className={classes.fab}
            onClick={sleepInputOpen}
          >
            <AddIcon />
          </Fab>
          <Fab
            color="primary"
            aria-label="Add"
            size="small"
            variant="extended"
            style={{ paddingLeft: 15, paddingRight: 15 }}
            onClick={toggleRecStatus}
          >
            Recommendations
          </Fab>
        </Toolbar>
        <Paper style={{ width: "90%", margin: "auto", padding: 25 }}>
          {content}
        </Paper>
        <SleepInputForm
          status={sleepInputStatus}
          close={sleepInputClose}
          activeData={activeData}
        />
        <Recommendations status={recStatus} toggle={toggleRecStatus} />
      </div>
    </ProfileProvider>
  );
};

export default withStyles(styles)(DashboardContainer);
