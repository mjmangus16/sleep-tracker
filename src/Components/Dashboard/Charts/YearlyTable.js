import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteSleepObject } from "../../../store/actions/profileActions";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@material-ui/core";

import { sleepCalc } from "../../../util/sleepCalc";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const YearlyTable = ({ classes, data, id, editSleep, deleteSleepObject }) => {
  const deleteItem = item => {
    const dateArray = item.date.split("/");
    const month = dateArray[0];
    const day = dateArray[1];
    const year = dateArray[2];
    deleteSleepObject(id, month, day, year);
  };

  const getEmoji = num => {
    if (num === 1) {
      return "😴";
    } else if (num === 2) {
      return "😐";
    } else if (num === 3) {
      return "😌";
    } else if (num === 4) {
      return "😀";
    }
  };

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">Start</TableCell>
          <TableCell align="center">End</TableCell>
          <TableCell align="center">Morning Emoji</TableCell>
          <TableCell align="center">Daytime Emoji</TableCell>
          <TableCell align="center">Total Hours Asleep</TableCell>
          <TableCell align="center" />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(item => (
          <TableRow key={item.date}>
            <TableCell align="center" component="th" scope="row">
              {item.date}
            </TableCell>
            <TableCell align="center">{item.start_sleep_time}</TableCell>
            <TableCell align="center">{item.end_sleep_time}</TableCell>
            <TableCell align="center" style={{ fontSize: "2rem" }}>
              {getEmoji(item.sleep_emotion)}
            </TableCell>
            <TableCell align="center" style={{ fontSize: "2rem" }}>
              {getEmoji(item.day_emotion)}
            </TableCell>
            <TableCell align="center">
              {sleepCalc(item.start_sleep_time, item.end_sleep_time)}
            </TableCell>
            <TableCell align="center">
              <Button
                variant="outlined"
                style={{ margin: 5 }}
                onClick={() =>
                  editSleep({
                    date: item.date,
                    startTime: item.start_sleep_time,
                    endTime: item.end_sleep_time,
                    morning: item.sleep_emotion,
                    day: item.day_emotion
                  })
                }
              >
                <i className="far fa-edit" />
              </Button>
              <Button
                variant="outlined"
                style={{ margin: 5 }}
                onClick={() => deleteItem(item)}
              >
                <i className="far fa-trash-alt" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    id: state.auth.user.subject
  };
};

export default connect(
  mapStateToProps,
  { deleteSleepObject }
)(withStyles(styles)(YearlyTable));
