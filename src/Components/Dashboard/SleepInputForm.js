import React, { useState, useEffect, useContext } from "react";

import { ProfileContext } from "../../contextAPI/ProfileContext";
import { AuthContext } from "../../contextAPI/AuthContext";

import { withStyles } from "@material-ui/core/styles";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";

import Clock from "../../util/Clock";

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 150,
    marginTop: 25
  },
  emoji: {
    margin: theme.spacing(1),
    fontSize: "2rem"
  }
});

const SleepInputForm = ({
  classes,
  activeData,
  updateSleepObject,
  close,
  status
}) => {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [morning, setMorning] = useState(5);
  const [day, setDay] = useState(5);
  const {
    0: {
      user: { subject: id }
    }
  } = useContext(AuthContext);
  const { 7: postSleepObject } = useContext(ProfileContext);

  const resetState = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setMorning(5);
    setDay(5);
  };

  const setData = () => {
    const dateArray = date.split("-");
    const formattedDate = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
    const object = {
      user_id: id,
      date: formattedDate,
      start_sleep_time: startTime,
      end_sleep_time: endTime,
      day_emotion: day,
      sleep_emotion: morning,
      month: parseInt(dateArray[1]),
      year: parseInt(dateArray[0]),
      day: parseInt(dateArray[2])
    };
    return object;
  };

  const submitForm = () => {
    const object = setData();
    postSleepObject(object);
    resetState();
    close();
  };

  const updateForm = () => {
    const object = setData();

    if (date === "") {
      const dateArray2 = activeData.date.split("/");
      object.date = activeData.date;
      object.month = parseInt(dateArray2[0]);
      object.year = parseInt(dateArray2[2]);
      object.day = parseInt(dateArray2[1]);
    }
    if (startTime === "") object.start_sleep_time = activeData.startTime;
    if (endTime === "") object.end_sleep_time = activeData.endTime;
    if (day === 5) object.day_emotion = activeData.day;
    if (morning === 5) object.sleep_emotion = activeData.morning;

    updateSleepObject(object);
    resetState();
    close();
  };

  const closeModal = () => {
    close();
    resetState();
  };

  const getDate = e => {
    setDate(e.target.value);
  };

  const handleClockSuccess = date => {
    setStartTime(date);
  };

  const handleClockSuccess_end = date => {
    setEndTime(date);
  };

  const emojiToggle = (e, data) => {
    let content = e.target.textContent;

    if (data === "Morning") {
      switch (content) {
        case "😴": {
          return setMorning(1);
        }
        case "😐": {
          return setMorning(2);
        }
        case "😌": {
          return setMorning(3);
        }
        case "😀": {
          return setMorning(4);
        }
        default: {
          return setMorning(5);
        }
      }
    } else if (data === "Daytime") {
      switch (content) {
        case "😴": {
          return setDay(1);
        }
        case "😐": {
          return setDay(2);
        }
        case "😌": {
          return setDay(3);
        }
        case "😀": {
          return setDay(4);
        }
        default: {
          return setDay(5);
        }
      }
    }
  };

  let formattedDate;
  let morningNum;
  let dayNum;

  if (activeData) {
    let dateArray = activeData.date.split("/");
    formattedDate = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;
    morningNum = activeData.morning;
    dayNum = activeData.day;
  }

  if (morning === 5 && !activeData) {
    morningNum = morning;
  } else if (morning === 5 && activeData) {
    morningNum = activeData.morning;
  } else if (morning !== 5) {
    morningNum = morning;
  }

  if (day === 5 && !activeData) {
    dayNum = day;
  } else if (day === 5 && activeData) {
    dayNum = activeData.day;
  } else if (day !== 5) {
    dayNum = day;
  }

  return (
    <Dialog open={status} onClose={closeModal}>
      <DialogTitle>Submit Sleep</DialogTitle>
      <DialogContent style={{ maxWidth: 500 }}>
        <DialogContentText>
          Complete the form below to submit your sleep cycle.
        </DialogContentText>
        <form className={classes.form}>
          <TextField
            defaultValue={formattedDate ? formattedDate : date}
            id="date"
            label="Date"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            onChange={getDate}
          />
          <div>
            <Clock
              label="Sleep Start"
              id="startTime"
              onSuccess={handleClockSuccess}
            />
            <Clock
              label="Sleep End"
              id="endTime"
              onSuccess={handleClockSuccess_end}
            />
          </div>
          <DialogContentText style={{ textAlign: "right" }}>
            Morning Feeling:{" "}
            <Button
              size="small"
              className={classes.emoji}
              onClick={e => emojiToggle(e, "Morning")}
              variant={morningNum === 1 ? "contained" : "text"}
            >
              <span role="img" aria-label="emoji">
                😴
              </span>
            </Button>
            <Button
              size="small"
              className={classes.emoji}
              onClick={e => emojiToggle(e, "Morning")}
              variant={morningNum === 2 ? "contained" : "text"}
            >
              <span role="img" aria-label="emoji">
                😐
              </span>
            </Button>
            <Button
              size="small"
              className={classes.emoji}
              onClick={e => emojiToggle(e, "Morning")}
              variant={morningNum === 3 ? "contained" : "text"}
            >
              <span role="img" aria-label="emoji">
                😌
              </span>
            </Button>
            <Button
              size="small"
              className={classes.emoji}
              onClick={e => emojiToggle(e, "Morning")}
              variant={morningNum === 4 ? "contained" : "text"}
            >
              <span role="img" aria-label="emoji">
                😀
              </span>
            </Button>
          </DialogContentText>
          <DialogContentText style={{ textAlign: "right" }}>
            Day Feeling:{" "}
            <Button
              size="small"
              className={classes.emoji}
              onClick={e => emojiToggle(e, "Daytime")}
              variant={dayNum === 1 ? "contained" : "text"}
            >
              <span role="img" aria-label="emoji">
                😴
              </span>
            </Button>
            <Button
              size="small"
              className={classes.emoji}
              onClick={e => emojiToggle(e, "Daytime")}
              variant={dayNum === 2 ? "contained" : "text"}
            >
              <span role="img" aria-label="emoji">
                😐
              </span>
            </Button>
            <Button
              size="small"
              className={classes.emoji}
              onClick={e => emojiToggle(e, "Daytime")}
              variant={dayNum === 3 ? "contained" : "text"}
            >
              <span role="img" aria-label="emoji">
                😌
              </span>
            </Button>
            <Button
              size="small"
              className={classes.emoji}
              onClick={e => emojiToggle(e, "Daytime")}
              variant={dayNum === 4 ? "contained" : "text"}
            >
              <span role="img" aria-label="emoji">
                😀
              </span>
            </Button>
          </DialogContentText>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          onClick={activeData ? updateForm : submitForm}
        >
          {activeData ? "Update" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(SleepInputForm);
