import React, { useEffect, useContext } from "react";

import { ProfileContext } from "../../contextAPI/ProfileContext";
import { AuthContext } from "../../contextAPI/AuthContext";

import { sleepCalc } from "../../util/sleepCalc";

import WeeklyChart from "./Charts/WeeklyChart";

const Weekly = () => {
  const {
    0: {
      isAuthenticated,
      user: { subject: id }
    }
  } = useContext(AuthContext);
  const {
    0: { weeklyData },
    3: getWeeklyData
  } = useContext(ProfileContext);

  useEffect(() => {
    if (isAuthenticated) {
      getWeeklyData(id);
    }
  }, [isAuthenticated]);

  let days;
  let hours;
  let content;
  let sum;

  if (weeklyData.length > 0) {
    days = weeklyData.map(item => item.day);

    hours = weeklyData.map(item => {
      sum = sleepCalc(item.start_sleep_time, item.end_sleep_time);
      sum = sum.split(":");

      if (sum[1] < 15) {
        sum = parseInt(sum[0]);
      } else if (sum[1] >= 15 && sum[1] <= 45) {
        sum = parseInt(sum[0]) + 0.5;
      } else if (sum[1] > 45) {
        sum = parseInt(sum[0]) + 1;
      }
      return sum;
    });

    days = days.reverse();
    hours = hours.reverse();

    content = <WeeklyChart hours={hours} days={days} />;
  }

  return <div style={{ width: "90%", margin: "auto" }}>{content}</div>;
};

export default Weekly;
