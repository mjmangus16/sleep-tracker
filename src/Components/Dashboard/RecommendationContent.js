import React, { useEffect, useContext } from "react";

import { ProfileContext } from "../../contextAPI/ProfileContext";
import { AuthContext } from "../../contextAPI/AuthContext";

import { sleepCalc } from "../../util/sleepCalc";

const RecommendationContent = () => {
  const {
    0: {
      isAuthenticated,
      user: { subject: id }
    }
  } = useContext(AuthContext);
  const {
    0: { recommendationData },
    6: getRecommendationData
  } = useContext(ProfileContext);

  useEffect(() => {
    if (isAuthenticated) {
      getRecommendationData(id);
    }
  }, [isAuthenticated]);

  const maxMood = moodArray => Math.max(...moodArray);

  const calcMode = numArray => {
    // results can be multimodal
    let modes = [],
      count = [],
      i,
      number,
      maxIndex = 0;

    for (i = 0; i < numArray.length; i += 1) {
      number = numArray[i];
      count[number] = (count[number] || 0) + 1;
      if (count[number] > maxIndex) {
        maxIndex = count[number];
      }
    }

    for (i in count)
      if (count.hasOwnProperty(i)) {
        if (count[i] === maxIndex) {
          modes.push(Number(i));
        }
      }

    return modes;
  };

  const moodArray = recommendationData.map(
    day => day.day_emotion + day.sleep_emotion
  );
  const maxMood_ = maxMood(moodArray);
  const optimalSleep = recommendationData
    .filter(day => day.day_emotion + day.sleep_emotion === maxMood_)
    .map(day =>
      parseInt(
        sleepCalc(day.start_sleep_time, day.end_sleep_time).split(":")[0],
        10
      )
    );
  return (
    <div>
      {calcMode(optimalSleep).length === 1
        ? `Your mood score tends to be highest when you sleep ${calcMode(
            optimalSleep
          )} hours.`
        : `Your mood score tends to be highest when you sleep either ${
            calcMode(optimalSleep)[0]
          } or ${calcMode(optimalSleep)[1]} hours.`}
    </div>
  );
};

export default RecommendationContent;
