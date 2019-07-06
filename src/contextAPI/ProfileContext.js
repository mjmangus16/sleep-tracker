import React, { createContext, useReducer } from "react";

import axios from "axios";
import {
  GET_DAILY_DATA,
  GET_WEEKLY_DATA,
  GET_MONTHLY_DATA,
  GET_YEARLY_DATA,
  GET_RECOMMENDATION_DATA,
  UPDATE_SLEEP_OBJECT,
  DELETE_SLEEP_OBJECT,
  POST_SLEEP_OBJECT,
  GET_ERRORS
} from "./types";

const link = "https://bw-sleep-tracker-app.herokuapp.com";

const profileReducer = (state, action) => {
  switch (action.type) {
    case GET_DAILY_DATA:
      return {
        ...state,
        dailyData: action.payload
      };
    case GET_WEEKLY_DATA:
      return {
        ...state,
        weeklyData: action.payload
      };
    case GET_MONTHLY_DATA:
      return {
        ...state,
        monthlyData: action.payload
      };
    case GET_YEARLY_DATA:
      return {
        ...state,
        yearlyData: action.payload
      };
    case GET_RECOMMENDATION_DATA:
      return {
        ...state,
        recommendationData: action.payload
      };
    case POST_SLEEP_OBJECT:
      return {
        ...state,
        yearlyData: action.payload
      };
    case UPDATE_SLEEP_OBJECT:
      return {
        ...state,
        yearlyData: action.payload
      };
    case DELETE_SLEEP_OBJECT:
      return {
        ...state,
        yearlyData: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export const ProfileContext = createContext();

export const ProfileProvider = props => {
  const [state, dispatch] = useReducer(profileReducer, {
    dailyData: [],
    weeklyData: [],
    monthlyData: [],
    yearlyData: [],
    recommendationData: []
  });

  const getDailyData = id => {
    axios
      .get(`${link}/tracker/${id}/limit/1/order/desc`)
      .then(res =>
        dispatch({
          type: GET_DAILY_DATA,
          payload: res.data[0] || ""
        })
      )
      .catch(err => console.log(err));
  };

  const getWeeklyData = id => {
    axios
      .get(`${link}/tracker/${id}/limit/7/order/desc`)
      .then(res =>
        dispatch({
          type: GET_WEEKLY_DATA,
          payload: res.data
        })
      )
      .catch(err => console.log(err));
  };

  const getMonthlyData = id => {
    axios
      .get(`${link}/tracker/${id}/month/6`)
      .then(res =>
        dispatch({
          type: GET_MONTHLY_DATA,
          payload: res.data
        })
      )
      .catch(err => console.log(err));
  };

  const getYearlyData = id => {
    axios
      .get(`${link}/tracker/${id}/year/2019`)
      .then(res => {
        dispatch({
          type: GET_YEARLY_DATA,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };

  const getRecommendationData = id => {
    axios
      .get(`${link}/tracker/${id}/yearall/2019`)
      .then(res => {
        dispatch({
          type: GET_RECOMMENDATION_DATA,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <ProfileContext.Provider
      value={[
        state,
        dispatch,
        getDailyData,
        getWeeklyData,
        getMonthlyData,
        getYearlyData,
        getRecommendationData
      ]}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};
