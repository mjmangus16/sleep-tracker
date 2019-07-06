import React, { useEffect, useContext } from "react";

import { ProfileContext } from "../../contextAPI/ProfileContext";
import { AuthContext } from "../../contextAPI/AuthContext";

import { sleepCalc } from "../../util/sleepCalc";

import DailyChart from "./Charts/DailyChart";

const Daily = () => {
  const {
    0: {
      isAuthenticated,
      user: { subject: id }
    }
  } = useContext(AuthContext);
  const {
    0: { dailyData },
    2: getDailyData
  } = useContext(ProfileContext);

  useEffect(() => {
    if (isAuthenticated) {
      getDailyData(id);
    }
  }, [isAuthenticated]);

  let sum;
  let difference;
  let content;

  if (Object.keys(dailyData).length) {
    sum = sleepCalc(dailyData.start_sleep_time, dailyData.end_sleep_time);

    sum = sum.split(":");

    if (sum[1] < 15) {
      sum = parseInt(sum[0]);
    } else if (sum[1] >= 15 && sum[1] <= 45) {
      sum = parseInt(sum[0]) + 0.5;
    } else if (sum[1] > 45) {
      sum = parseInt(sum[0]) + 1;
    }

    difference = 24 - sum;
    content = <DailyChart data={dailyData} sum={sum} difference={difference} />;
  }

  return <div>{content}</div>;
};

export default Daily;
