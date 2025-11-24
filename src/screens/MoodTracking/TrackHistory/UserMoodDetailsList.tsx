import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import UserMoodDeatils from "./UserMoodDeatils";
import MoodDetailsData from "./MoodDetailsData";
import { moderateScale } from "../../../constant/responsiveStyle";
import {
  RelaxedMinIcon,
  StressedMinIcon,
  VeryRelaxedMinIcon,
  VeryStressedMinEmoji,
} from "../../../assets";

interface Props {
  moodData?: any;
}
const UserMoodDetailsList: React.FC<Props> = ({ moodData }) => {
  const renderIcon = (num: number) => {
    if (num <= 20) {
      return <VeryStressedMinEmoji />;
    }
    if (num >= 21 && num <= 40) {
      return <StressedMinIcon />;
    }
    if (num >= 41 && num <= 60) {
      return <RelaxedMinIcon />;
    }
    if (num >= 61 && num <= 80) {
      return <RelaxedMinIcon />;
    }
    if (num >= 81 && num <= 100) {
      return <VeryRelaxedMinIcon />;
    }
  };
  return (
    <View style={style?.mainContainer}>
      <FlatList
        keyExtractor={(item, index) => "key" + index}
        data={moodData}
        style={{ gap: 40 }}
        renderItem={({ item, index }) => {
          return (
            <View>
              <MoodDetailsData
                moodTitle={item?.moodTitle}
                time={item?.time}
                moodImpact={item?.moodImpact}
                resone={item?.resone}
                conditionTitle={item?.conditionTitle}
                note={item?.note}
                SvgIcon={() => renderIcon(item?.moodMeter)}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default UserMoodDetailsList;

const style = StyleSheet.create({
  mainContainer: { marginTop: moderateScale(40) },
});
