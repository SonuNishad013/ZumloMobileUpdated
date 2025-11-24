import React from "react";
import PhysicalHealthGoals from "./PhysicalHealthGoals";

const EmotionalWellBiengGoals = ({
  data,
  navigation,
  goalID,
  short_longID,
  userData,
  onSwiperClick,
  screenIndex,
  setScreenIndex,
  setToasterDetails,
  from,
  setNextSection,
}: any) => {
  return (
    <PhysicalHealthGoals
      data={data}
      emotionalGoals={true}
      navigation={navigation}
      goalID={goalID}
      short_longID={short_longID}
      userData={userData}
      onSwiperClick={onSwiperClick}
      screenIndex={screenIndex}
      setScreenIndex={setScreenIndex}
      setToasterDetails={(value: any) => {
        setToasterDetails(value);
      }}
      setNextSection={() => {
        setNextSection(false);
      }}
      from={from}
    />
  );
};

export default EmotionalWellBiengGoals;
