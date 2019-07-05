import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getMonthlyData } from "../../store/actions/profileActions";

import { sleepCalc } from "../../util/sleepCalc";

import MonthlyChart from "./Charts/MonthlyChart";

const Monthly = ({ isAuthenticated, id, monthlyData, getMonthlyData }) => {
  useEffect(() => {
    if (isAuthenticated) {
      getMonthlyData(id);
    }
  });

  let days;
  let hours;
  let content;
  let sum;

  if (monthlyData.length > 0) {
    days = monthlyData.map(item => item.day);

    hours = monthlyData.map(item => {
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

    content = <MonthlyChart hours={hours} days={days} />;
  }

  return <div style={{ width: "90%", margin: "auto" }}>{content}</div>;
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    id: state.auth.user.subject,
    monthlyData: state.profile.monthlyData
  };
};

export default connect(
  mapStateToProps,
  { getMonthlyData }
)(Monthly);
