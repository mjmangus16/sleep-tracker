import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDailyData } from "../../store/actions/profileActions";

import { sleepCalc } from "../../util/sleepCalc";

import DailyChart from "./Charts/DailyChart";

const Daily = ({ isAuthenticated, id, getDailyData, dailyData }) => {
  useEffect(() => {
    if (isAuthenticated) {
      getDailyData(id);
    }
  });

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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    id: state.auth.user.subject,
    dailyData: state.profile.dailyData
  };
};

export default connect(
  mapStateToProps,
  { getDailyData }
)(Daily);
