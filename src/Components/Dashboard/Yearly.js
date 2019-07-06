import React, { useEffect, useContext } from "react";

import { ProfileContext } from "../../contextAPI/ProfileContext";
import { AuthContext } from "../../contextAPI/AuthContext";

import YearlyTable from "./Charts/YearlyTable";

const Yearly = ({ editSleep }) => {
  const {
    0: {
      isAuthenticated,
      user: { subject: id }
    }
  } = useContext(AuthContext);
  const {
    0: { yearlyData },
    5: getYearlyData
  } = useContext(ProfileContext);

  useEffect(() => {
    if (isAuthenticated) {
      getYearlyData(id);
    }
  }, [isAuthenticated]);

  return <YearlyTable data={yearlyData} editSleep={editSleep} />;
};

export default Yearly;
