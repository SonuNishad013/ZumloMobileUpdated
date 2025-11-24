import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import MoodMeter from "./MoodMeter";
import colors from "../../../constant/colors";
import { moderateScale } from "../../../constant/responsiveStyle";
import {
  ArrowCircleDown,
  RelaxedMinIcon,
  StressedMinIcon,
  VeryRelaxedMinIcon,
  VeryStressedMinEmoji,
} from "../../../assets";

interface Props {
  moodData?: any;
}

const UserMoodDetails: React.FC<Props> = ({ moodData }) => {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{"Today's check-in"}</Text>
        <ArrowCircleDown />
      </View>

      <View style={styles.card}>
        <FlatList
          data={moodData}
          keyExtractor={(item, index) => "key" + index}
          style={styles.flatList}
          numColumns={6}
          renderItem={({ item, index }) => (
            <View style={styles.moodMeterContainer}>
              <MoodMeter
                time={item?.time}
                meter={item?.moodMeter}
                SvgIcon={() => renderIcon(item?.moodMeter)}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(30),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(1),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontWeight: "500",
    color: colors?.SurfCrest,
  },
  card: {
    backgroundColor: colors?.SurfCrest,
    borderRadius: moderateScale(18),
    paddingTop: moderateScale(40),
    paddingBottom: moderateScale(25),
    marginTop: moderateScale(15),
  },
  flatList: {
    paddingHorizontal: 12,
  },
  moodMeterContainer: {
    flex: 1,
  },
});

export default UserMoodDetails;
